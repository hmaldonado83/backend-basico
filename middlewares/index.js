



const validatorfields = require('../middlewares/validator_fields');
const  validatorJWT  = require('../middlewares/validator-jwt');
const validatorRoles = require('../middlewares/validator-roles');


module.exports = {
    ...validatorfields,
    ...validatorJWT,
    ...validatorRoles
}