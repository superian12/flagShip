const Product = require('../models/product.model');
const Vendor = require('../models/product.model')

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.render('products', {
        title: 'title Data',
        status: 1
    });
};

exports.test_index = function(req,res){
    res.render('index');
}
exports.product_create = function (req, res) {
    var sum1 = parseInt(req.body.add1);
    var sum2 = parseInt(req.body.add2);
    var total = sum1 + sum2;
    let product = new Product(
        {
            name: req.body.name,
            price: total
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created ?')
    })
};
exports.product_details = function (req, res) {
    Product.findById(req.params.findById, function (err, product) {
        if (err) return next(err);
        res.send(product)
    })
};
exports.product_select = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product)
    })
};
exports.product_custom = function (req, res) {
    Product.find({ name: req.params.name }, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
}

exports.product_search = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.vendor_create = function (req, res) {
    let vendor = new Vendor({
        userID: req.body.id,
        name: req.body.name,
        tel: req.body.tel,
        mobile: req.body.mobile
    })

    vendor.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Vendor Created')
    })
}
// exports.status = function (req, res) {
//     res.render('int');
// }te