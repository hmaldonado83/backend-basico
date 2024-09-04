
const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuario');

const validatorJWT =async (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msj: 'No ahi token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETKEY)

        const user =  await User.findById( uid);

        if (!user) {
            return res.status(401).json({
                msj: 'Token no valido - usuario no existe'
            });
            
        }


        // validar que el status este en true

        if (!user.status){
            return res.status(401).json({
                msj: 'El usuario no puede eliminar registro'
            });
            
        }

        req.user = user;
        
    } catch (error) {
        return res.status(401).json({
            msj: 'Token invalido'
        });
        
    }
    console.log(token);

    next();
}



module.exports = {
    validatorJWT
}