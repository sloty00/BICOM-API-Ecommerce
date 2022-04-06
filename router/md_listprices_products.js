//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdListprice } = require('../controllers/md_listprices_products')

//Rutas.
router.get('/', getAllMdListprice);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;