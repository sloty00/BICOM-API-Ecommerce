//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllRegions } = require('../controllers/regions')

//Rutas.
router.get('/', getAllRegions);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;