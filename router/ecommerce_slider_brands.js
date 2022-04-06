//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllEcommerceBrands } = require('../controllers/ecommerce_slider_brands')

//Rutas.
router.get('/', getAllEcommerceBrands);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;