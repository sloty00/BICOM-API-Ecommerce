const express = require('express');
const router_products = express.Router();
const { getAllProducts } = require("../controllers/products");

router_products.get('/products', getAllProducts);

module.exports = router_products;