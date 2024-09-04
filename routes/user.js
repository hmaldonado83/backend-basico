

const { check } = require('express-validator');
const { Router } = require('express');

const { userGet, userPut, userPost, userPatch, userDelete } = require('../controllers/user');


const {validatorfields,
    validatorJWT,
    isAdminRole,hasRol } = require('../middlewares');

const { validateRol, verifyEmail, verifyPhone, verifyUserForId } = require('../helpers/db-validators');





const router = Router();



router.get('/', userGet  );

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(verifyUserForId),
    check('role').custom( validateRol ),
    validatorfields
], userPut);
router.post('/',[
    check('name', 'El campo de nombre es obligatorio').not().isEmpty(),
    check('phone').custom(verifyPhone),
    check('password', 'El password debe de ser ma de 6 letras').isLength({ min: 6}),
    check('email').custom(verifyEmail),
    //check('role', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( validateRol ),
    validatorfields

] , userPost);



router.delete('/:id',[
    
    validatorJWT,
    //isAdminRole, 
    hasRol('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(verifyUserForId),
    ],
    validatorfields
     ,userDelete);





router.patch('/', userPatch);


module.exports =router;