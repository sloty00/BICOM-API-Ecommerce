//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMuis } = require('../controllers/muis')

//Rutas.
router.get('/', getAllMuis);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;