//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllBanks } = require('../controllers/banks')

//Rutas.
router.get('/', getAllBanks);

//Exportamos las funciones para usar en server.js.
module.exports = router;