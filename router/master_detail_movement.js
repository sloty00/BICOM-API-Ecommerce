//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdMovement } = require('../controllers/master_detail_movement')
//Rutas.
router.get('/', getAllMdMovement);

//Exportamos las funciones para usar en server.js.
module.exports = router