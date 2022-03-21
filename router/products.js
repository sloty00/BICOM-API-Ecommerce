//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllProducts } = require('../controllers/products')

//Rutas.
router.get('/', getAllProducts);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;