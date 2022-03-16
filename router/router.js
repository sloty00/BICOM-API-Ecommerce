const express = require('express');
const router = express.Router();
const db = require('../config/dbConnection');
const { getAllProducts } = require("../controllers/products");
const { getAllGroups } = require("../controllers/groups");
const { getAllMui } = require("../controllers/muis");
const { getAllCustomers } = require("../controllers/customers");


router.get('/products', getAllProducts);


router.get('/groups', getAllGroups);

router.get('/measurement_unit', getAllMui);

router.get('/costumer_supp', getAllCustomers);

module.exports = router;