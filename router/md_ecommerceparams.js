//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllEcommp } = require('../controllers/md_ecommerceparams')

//Rutas.
router.get('/', getAllEcommp);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;