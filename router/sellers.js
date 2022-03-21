//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllSellers } = require('../controllers/sellers')

//Rutas.
router.get('/', getAllSellers);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;