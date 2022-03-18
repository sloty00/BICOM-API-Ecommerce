const { Router } = require('express');
const router = Router();
const { getAllProducts } = require('../controllers/products')

router.get('/', getAllProducts);

module.exports = router;