//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllSubgroups } = require('../controllers/subgroups')

//Rutas.
router.get('/', getAllSubgroups);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;