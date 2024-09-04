const { response } = require("express");


const isAdminRole = ( req, res= response, next) => {

    if (!req.user){
        return res.status(500).json({
            msj: 'Se requiere el role sin validar el token primero'
        });
        
    }
    const {role, name} = req.user;

    if (role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msj: `${name} no es administrador`
        });
    }

    next();

}

const hasRol = (...roles) => {
    return (req, res= response, next) => {

        if (!req.user){
            return res.status(500).json({
                msj: 'Se requiere el role sin validar el token primero'
            });
            
        }

        if (!roles.includes(req.user.role)){
            console.log(roles);
            console.log(req.user.role);
            return res.status(401).json({
                msj: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();
    }

}



module.exports = {
    isAdminRole,
    hasRol
}