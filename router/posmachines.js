//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllPosMachines, Add_Posmachines, Put_Posmachines } = require('../controllers/posmachines')

//Rutas.
router.get('/', getAllPosMachines);

router.post('/insert', Add_Posmachines);

router.put('/update/:id_params', Put_Posmachines);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;