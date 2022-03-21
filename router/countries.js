//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCountries } = require('../controllers/countries')

//Rutas.
router.get('/', getAllCountries);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;