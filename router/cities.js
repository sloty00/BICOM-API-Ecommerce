//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCities } = require('../controllers/cities')

//Rutas.
router.get('/', getAllCities);

//Exportamos las funciones para usar en server.js.
module.exports = router;