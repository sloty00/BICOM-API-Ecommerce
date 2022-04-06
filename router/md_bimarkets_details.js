//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdBimarketDetail } = require('../controllers/md_bimarkets_details')

//Rutas.
router.get('/', getAllMdBimarketDetail);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;