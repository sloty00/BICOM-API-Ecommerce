//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCostCenters } = require('../controllers/costcenters')

//Rutas.
router.get('/', getAllCostCenters);

//Exportamos las funciones para usar en server.js.
module.exports = router;