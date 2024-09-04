const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {


        const user = await User.findOne({ email });

        if (!user){
            return res.status(400).json({
               
                msg: "Usuario / contraseña no son correcta"
            });
        }

        if (!user.status){
            return res.status(400).json({
               
                msg: "Usuario / contraseña no son correcta - estado false"
            });
        }

        const validatorPass = (bcryptjs.compareSync(password, user.password));


        if (!validatorPass){
            return res.status(400).json({
               
                msg: "Usuario / contraseña no son correcta Password"
            });
        }

        const token = await generarJWT( user.id );

        console.log(token);


        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }


   
}



module.exports = {
    login
}