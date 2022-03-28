//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdProduct } = require('../controllers/md_product')

//Rutas.
router.get('/', getAllMdProduct);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;