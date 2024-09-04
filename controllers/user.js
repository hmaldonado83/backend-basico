
const { response, request } = require('express');

const Usuario= require('../models/usuario');

const bcryptjs = require('bcryptjs');


const userGet = async (req, res = response) =>{
 //   const {q,apiKey,page, limit} = req.query;

 const { limit = 5, offset = 0} = req.query;
const query = { status: true}
 
    const [total, users] =await Promise.all([
        Usuario.countDocuments(query)
        .skip(Number(offset))
        .limit(Number(limit)),
        Usuario.find(query)
        .skip(Number(offset))
        .limit(Number(limit))
    ])

    res.json({
        total, 
        users
       
    });
}

const userPost = async (req, res) =>{

    const { name, email, phone,password,role } = req.body;

    const usuario = new Usuario( {
        name,
        email,
        phone,
        password,
        role
    } );


    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(201).json({
        msg: 'post Api - Controlleres',
        usuario
    });
}




const userPut = async (req, res) =>{
    const {id} = req.params;
    const {_id, password, google, email, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    
    res.status(201).json( usuario);
}




const userPatch = (req, res) =>{
    res.status(201).json({
       msg: 'post Patch - Controller'
    });
}

const userDelete = async (req, res= response) =>{
    const { id } = req.params;

   
    const user = await Usuario.findByIdAndUpdate(id, {status:false})
   
    res.json(user);
}



module.exports = {
    userGet,
    userPut,
    userPost,
    userPatch,
    userDelete
}