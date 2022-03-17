const express = require('express');
const router_customers = express.Router();
const { getAllCustomers } = require("../controllers/customers");

router_customers.get('/costumer_supp', getAllCustomers);

module.exports = router_customers;