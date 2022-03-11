const {Router} = require("express");
const router = Router();
const {registerUser, loginUser, renewToken, UpdateUserEnterprise, GetUserEnterprise, GetUserFromCategory, UpdateUserClient} = require('../controllers/auth');
const {check} = require("express-validator");
const { validateInputs } = require("../middlewares/validate-inputs");
const { validateJwt } = require("../middlewares/validate-jwt");
const { validateUniqueEmailUser, validateUniqueUserName } = require("../middlewares/validate-unique");
const fileUpload = require('express-fileupload');


/** /api/auth */

// UploadFile
router.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


// Login
router.post('/', [
    check('email', 'El email es Obligatorio').notEmpty(),
    check('email', 'El email debe ser valido').isEmail(),
    check('password', 'El password es Obligatorio').notEmpty(),
    check('password', 'El password debe ser minimo de 5 caracteres').isLength({ min: 5}),
    validateInputs
], loginUser);

// Register
router.post(
    '/register', 
    [ 
        check('email', 'El email es Obligatorio').notEmpty(),
        check('email', 'El email debe ser valido').isEmail(),
        check('password', 'El password es Obligatorio').notEmpty(),
        check('password', 'El password debe ser minimo de 5 caracteres').isLength({ min: 5}),
        check('password', '').custom(async (password, {req}) => {
            const password_confirm = req.body.password_confirm
            if(password !== password_confirm){
              throw new Error('Los password deben coincidir')
            }
        }),
        validateInputs
    ], 
    registerUser
);

// Update Profile Enterprise
router.put(
    '/update-enterprise',
    [        
        validateJwt,
        check('email', 'El email es Obligatorio').notEmpty().isEmail().custom(validateUniqueEmailUser),
        check('name', 'El Nombre es Obligatorio').notEmpty(),
        check('username', 'El Nombre de usuario es Obligatorio').notEmpty().custom(validateUniqueUserName),
        check('description', 'El campo Descripción es Obligatorio').notEmpty(),
        check('address', 'El campo Dirección es Obligatorio').notEmpty(),
        check('country', 'El Pais es Obligatorio').notEmpty(),
        validateInputs
    ],
    UpdateUserEnterprise
);


// GET Profile 
router.get(
    '/update-enterprise',
    [        
        validateJwt
    ],
    GetUserEnterprise
);


// GET PROFILE FROM CATEGORY
router.get(
    '/profiles/:page/:category/:query?',
    [        
        
    ],
    GetUserFromCategory
);


// Update Profile Client
router.put(
    '/update-client',
    [        
        validateJwt
    ],
    UpdateUserClient
);


// JWT Token
router.get('/renew-token',[
    validateJwt
], renewToken);

module.exports = router;