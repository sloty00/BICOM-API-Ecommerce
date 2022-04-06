//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdInventories } = require('../controllers/md_inventories_details')

//Rutas.
router.get('/', getAllMdInventories);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;