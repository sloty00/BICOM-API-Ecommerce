//Declaracion Constantes.
const { Router } = require('express');
const router = Router();
const { getAllMdTransbankBranch } = require('../controllers/md_transbank_branchoffices')

//Rutas.
router.get('/', getAllMdTransbankBranch);

//Exportamos ñas funciones para usar en server.js.
module.exports = router;