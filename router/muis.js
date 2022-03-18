const { Router } = require('express');
const router = Router();
const { getAllMuis } = require('../controllers/muis')

router.get('/', getAllMuis);

module.exports = router;