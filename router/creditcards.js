//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllCreditsCards } = require('../controllers/creditcards')

//Rutas.
router.get('/', getAllCreditsCards);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;