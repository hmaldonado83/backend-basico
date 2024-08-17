
const { response, request } = require('express');

const userGet =(req, res = response) =>{
    const {q,apiKey,page, limit} = req.query;
    res.json({
       msg: 'get Api - controlador',
       q,apiKey,page, limit
    });
}


const userPut =(req, res) =>{
    const id = req.params.id;
    res.status(201).json({
       msg: 'put Api - Controller', 
       id
    });
}
const userPost = (req, res) =>{
    const{ name, old } = req.body;
    res.status(201).json({
        msg: 'post Api - Controller',
        name,
        old
    });
}

const userPatch = (req, res) =>{
    res.status(201).json({
       msg: 'post Patch - Controller'
    });
}

const userDelete =(req, res) =>{
    res.json({
       msg: 'delete Api - controller'
    });
}



module.exports = {
    userGet,
    userPut,
    userPost,
    userPatch,
    userDelete
}