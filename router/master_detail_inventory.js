//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdInventory } = require('../controllers/master_detail_inventory')

//Rutas.
router.get('/', getAllMdInventory);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;