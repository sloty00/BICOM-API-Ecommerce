//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdMovement } = require('../controllers/md_movements_details')
//Rutas.
router.get('/', getAllMdMovement);

//Exportamos las funciones para usar en server.js.
module.exports = router