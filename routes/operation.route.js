const express = require('express');
const router = express.Router();

// Require the controller 
const operations_controller = require('../controllers/operations.controller')

router.get('/',operations_controller.operation_home);
router.post('/auth',operations_controller.operation_auth);
router.get('/add',operations_controller.operation_addUser);
router.get('/dashboard',operations_controller.operation_dashboard);
router.get('/viewparcel',operations_controller.operation_viewParcel);
router.post('/addParcel',operations_controller.operation_addParcel);
router.post('/testparse',operations_controller.operation_testparser);

module.exports = router;