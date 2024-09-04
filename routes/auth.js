const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validatorfields } = require('../middlewares/validator_fields');

const router = Router();



router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validatorfields
], login   );


module.exports = router;