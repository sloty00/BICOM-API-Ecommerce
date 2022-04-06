//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllEcommerceShipping } = require('../controllers/md_ecommerce_shipping')

//Rutas.
router.get('/', getAllEcommerceShipping);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;