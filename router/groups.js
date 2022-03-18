const { Router } = require('express');
const router = Router();
const { getAllGroups } = require('../controllers/groups')

router.get('/', getAllGroups);

module.exports = router;