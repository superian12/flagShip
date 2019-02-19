const express = require('express');
const router = express.Router();

// Require the controller 
const operations_controller = require('../controllers/operations.controller')

router.get('/',operations_controller.operation_home);

module.exports = router;