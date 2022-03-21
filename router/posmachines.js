//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllPosMachines } = require('../controllers/posmachines')

//Rutas.
router.get('/', getAllPosMachines);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;