
const Role = require('../models/role');
const Usuario = require('../models/usuario');


const validateRol =  async (role = '') => {
    const existRol = await Role.findOne({role});
    if ( !existRol ){
        throw new Error(`El rol ${role} no esta permitido en la BD`);
    }

}




const verifyEmail =  async (email = '') => {

    const exitEmail = await Usuario.findOne({ email });

    if (exitEmail){
        throw new Error(`El correo ${email} ya esta registrado`);
    }

}

const verifyPhone = async (phone ='') => {
    const exitPhone = await Usuario.findOne({ phone });
    if (exitPhone){
        throw new Error(`El telefono ${phone} ya esta registrado`);
    }
}


const verifyUserForId =  async ( id ) => {

    const exitId = await Usuario.findById(id);

    if (!exitId){
        throw new Error(`El id ${id} no esta registrado`);
    }

}








module.exports = {
    validateRol,
    verifyEmail,
    verifyPhone,
    verifyUserForId
}