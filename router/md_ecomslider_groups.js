//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllEcommerceImages } = require('../controllers/md_ecomslider_groups')

//Rutas.
router.get('/', getAllEcommerceImages);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;