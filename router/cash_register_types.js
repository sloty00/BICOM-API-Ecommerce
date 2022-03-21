//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCRT } = require('../controllers/cash_registers_types')

//Rutas.
router.get('/', getAllCRT);

//Exportamos las funciones para usar en server.js.
module.exports = router;