const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
router.get('/',product_controller.test_index);

router.post('/add', product_controller.product_create);
router.get('/:id',product_controller.product_search);
router.get('/:name',product_controller.product_custom);
// router.get('/status',product_controller.status);
router.post('/addVendor',product_controller.vendor_create);
module.exports = router;

