//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllWarehouses } = require('../controllers/warehouses')

//Rutas.
router.get('/', getAllWarehouses);

//Exportamos las funciones para usar en server.js.
module.exports = router;