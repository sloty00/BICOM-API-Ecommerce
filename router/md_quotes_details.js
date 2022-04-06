//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdQuoteDetail } = require('../controllers/md_quotes_details')

//Rutas.
router.get('/', getAllMdQuoteDetail);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;