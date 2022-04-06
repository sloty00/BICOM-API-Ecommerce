//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllEcommp } = require('../controllers/md_ecommerce_sellers_warehouses')

//Rutas.
router.get('/', getAllEcommp);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;