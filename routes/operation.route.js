const express = require('express');
const router = express.Router();

// Require the controller 
const operations_controller = require('../controllers/operations.controller')

router.get('/',operations_controller.operation_home);
router.post('/auth',operations_controller.operation_auth);
router.get('/add',operations_controller.operation_addUser);
router.get('/dashboard',operations_controller.operation_dashboard);
// Parcel Management
router.get('/viewparcel',operations_controller.operation_viewParcel);
router.post('/addParcel',operations_controller.operation_addParcel);
router.post('/testparse',operations_controller.operation_testparser);
router.get('/manage/:waybill',operations_controller.operation_manageParcel);
router.post('/checkoutParcel',operations_controller.operation_checkoutParcel);
router.post('/deliverParcel',operations_controller.operation_deliver);
// router.get('/checkout/:wayBill',operations_controller);
// Vendor Management
router.get('/config',operations_controller.operation_getVendor);
router.post('/insertvendor',operations_controller.operation_addVendor);
//Area Management
// router.get('/config',operations_controller.opreration_getArea);
router.post('/addArea', operations_controller.opreration_addArea);
// USER

router.get('/users',operations_controller.operation_viewUsers);
router.post('/users',operations_controller.operations_addUsers);
module.exports = router;