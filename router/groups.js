const express = require('express');
const router_groups = express.Router();
const { getAllGroups } = require("../controllers/groups");

router_groups.get('/groups', getAllGroups);

module.exports = router_groups;