//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllPrinters } = require('../controllers/printers')

//Rutas.
router.get('/', getAllPrinters);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;