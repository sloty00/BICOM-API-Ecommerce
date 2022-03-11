const {Router} = require("express");
const router = Router();
const {registerUser, loginUser, renewToken} = require('../controllers/auth');
const {check} = require("express-validator");
const { validateInputs } = require("../middlewares/validate-inputs");
const { validateJwt } = require("../middlewares/validate-jwt");
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

// JWT Token
router.get('/renew-token',[
    validateJwt
], renewToken);

module.exports = router;