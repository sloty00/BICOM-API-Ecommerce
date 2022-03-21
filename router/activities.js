//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllActivities } = require('../controllers/activities')

//Rutas.
router.get('/', getAllActivities);

//Exportamos las funciones para usar en server.js.
module.exports = router;