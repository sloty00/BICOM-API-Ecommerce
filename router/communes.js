//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCommunes } = require('../controllers/communes')

//Rutas.
router.get('/', getAllCommunes);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;