//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllTaxes } = require('../controllers/taxes')

//Rutas.
router.get('/', getAllTaxes);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;