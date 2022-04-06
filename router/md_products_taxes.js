//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdProductTaxes } = require('../controllers/md_products_taxes')

//Rutas.
router.get('/', getAllMdProductTaxes);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;