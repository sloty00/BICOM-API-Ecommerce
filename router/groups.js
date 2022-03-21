//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllGroups } = require('../controllers/groups')

//Rutas.
router.get('/', getAllGroups);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;