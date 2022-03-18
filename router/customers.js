const { Router } = require('express');
const router = Router();
const { getAllCustomers } = require('../controllers/customers')

router.get('/', getAllCustomers);

module.exports = router;