const Product = require('../models/product.model');
const Vendor = require('../models/product.model');
const messenger = require('../models/messenger.model');

//Simple version, without validation or sanitation

exports.operation_home = function(req,res){
    res.render('operations/index');
}

// exports.status = function (req, res) {
//     res.render('int');
// }te