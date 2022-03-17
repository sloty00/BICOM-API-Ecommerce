const express = require('express');
const router_muis = express.Router();
const { getAllMui } = require("../controllers/muis");

router_muis.get('/measurement_unit', getAllMui);

module.exports = router_muis;