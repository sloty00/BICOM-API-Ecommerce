//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCustomers } = require('../controllers/customers')

//Rutas.
router.get('/', getAllCustomers);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;