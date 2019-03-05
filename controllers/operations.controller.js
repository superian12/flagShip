const Product = require('../models/product.model');
const Vendor = require('../models/vendor.model');
const messenger = require('../models/messenger.model');
const User = require('../models/user.model');


//Simple version, without validation or sanitation

exports.operation_home = function (req, res) {
    res.render('operations/index');
}
exports.operation_auth = function (req, res) {
    // Auth logic


    User.find({ email: req.body.email }, { "email": 1 }, function (err, user) {
        if (err) return next(err);
        if (!user.length) {
            res.send('No data found')
        }
        else {
            res.redirect('/ops/dashboard');
        }


    })

}

exports.operation_addUser = function (req, res, next) {
    let user = new User({
        userID: 0,
        email: "christian.ian.banzon@gmail.com",
        firstName: "Christian",
        lastNane: "Banzon",
        mobile: 1,
        isActive: true
    })
    user.save(function (err) {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'User already exist!'
            });
        }
        res.send('Vendor Created')
    })
}
exports.operation_dashboard = function (req, res) {

    Product.count({ 'status': 1 }, function (err, product) {
        if (err) return next(err);
        // res.render('operations/view_parcel', {product} )
        joborder = product
    });
    Product.count({ 'status': 2 }, function (err, product) {
        if (err) return next(err);
        // res.render('operations/view_parcel', {product} )
        storage = product
    });
    Product.count({ 'status': 3 }, function (err, product) {
        if (err) return next(err);
        otw = product
    })


    res.render('operations/dashboard', { product: joborder, product: storage, product: otw })
}
// Add Parcels

exports.operation_viewParcel = function (req, res, next) {
    Product.find({}).sort({ 'status': 'desc' }).exec(function (err, product) {
        if (err) return next(err);

        grid = product
    });

    Vendor.find({},{"code":1,"name":1}, function(err,vendor){
        if (err) return next(err);
        vendor_list = vendor
    })

    res.render('operations/view_parcel', { product: grid,vendor:vendor_list })

}

exports.operation_addParcel = function (req, res, next) {
    let parcel = new Product({

        wayBill: req.body.waybill,
        recipient: req.body.recipient,
        address: req.body.address,
        messengerGet: 0,
        messengerDelivered: 0,
        area: req.body.area,
        size: req.body.size,
        vendorID: req.body.vendor,
        // addOnKg:{type:Number},
        // datePickedUp:{type: Date},
        // dateOnRoute:{type: Date},
        // dateDelivered:{type: Date},
        status: 1,
        isPayed: false,
    })

    // res.send(req.body.address)

    parcel.save(function (err) {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'User already exist!'
            });
        }

    })

    res.redirect('/ops/viewparcel')
}

exports.operation_testparser = function (req, res) {
    // Vendor.find({},{"userID":1,"name":1}, function(err,vendor){
    //     if (err) return next(err);
    //     list = vendor
    // })
    // res.send({vendor:list});

    let vendor = new Vendor({
        code: 3,
        name:"La Favorita",
        tel: 09178213064,
        mobile: 28423123,
        address: "1400 Favorita Street",
        isActive: true
    })
    vendor.save(function (err) {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'User already exist!'
            });
        }

    })

    res.send('OK')
}

// exports.status = function (req, res) {
//     res.render('int');
// }te