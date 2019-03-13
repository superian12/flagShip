const db = require('./../config/db');
const parcelSQL = require('./../config/functions/parcels');
const messengerSQL = require('./../config/functions/messenger');
const areaSQL = require('./../config/functions/area');
const mysqlStatements = require('./../config/functions/system_functions');

//Simple version, without validation or sanitation

exports.operation_home = function (req, res) {
    res.render('operations/index');
}
exports.operation_auth = function (req, res) {
    // // Auth logic


    // User.find({ email: req.body.email }, { "email": 1 }, function (err, user) {
    //     if (err) return next(err);
    //     if (!user.length) {
    //         res.send('No data found')
    //     }
    //     else {
    //         res.redirect('/ops/dashboard');
    //     }


    // })

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
    parcelSQL.getcard(function (err, parcel) {
        parcelSQL.getVendor(function (err, vendor_list) {
            res.render('operations/dashboard', { parcel, vendor_list })
        })

    });
}
// PARCEL MANAGEMENT

exports.operation_viewParcel = function (req, res, next) {

    parcelSQL.getActiveParcel((err,parcels)=>{
        parcelSQL.getVendor((err,vendor_list)=> {
            messengerSQL.getActiveMessenger((err,messenger_list)=>{
                areaSQL.getActiveArea((err,area_list)=>{
                    parcelSQL.getExportParcel((err,checkout_list) => {
                        parcelSQL.getDeliveryParcel((err,deliver_list)=>{
                            res.render('operations/view_parcel', { parcels, vendor_list, messenger_list, area_list, checkout_list, deliver_list });
                        })
                    })
                })
            })
        })
    })
    
}

exports.operation_addParcel = function (req, res, next) {

    let postData = {
        wayBill: req.body.waybill,
        recipient: req.body.recipient,
        address: req.body.recipient,
        messengerGet: req.body.get,
        area: req.body.area,
        size: req.body.size,
        vendorCode: req.body.vendorCode,
        status: 1,
        addOnKg: req.body.addOn,
        isPayed: true
    };

    let sql = 'INSERT INTO parcels SET dateGenerated = NOW(), ?';
    let query = db.query(sql, postData, (err, result) => {
        if (err) res.send(err);
        console.log(result);
        res.send(result);
    });
}

exports.operation_testparser = async function (req, res){


}

exports.operation_manageParcel = function (req, res) {
    // res.render('operations/manage_parcel');
    waybill = req.params.waybill
    let sql = `SELECT * FROM parcels WHERE waybill = '${waybill}'`;
    let query = db.query(sql, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        list = result[0]
        // res.send(result[0]);
        res.render('operations/manage_parcel', { list });
    });
}
exports.operation_checkoutParcel = function (req, res) {
    let sql = `UPDATE parcels set dateOnRoute = NOW() , status = 2 , messengerPost = ${req.body.checkout} WHERE wayBill = '${req.body.waybill}' `;
    let query = db.query(sql, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.redirect('/ops/viewparcel')
    })
    // var params = { bill: req.body.waybill, mes: req.body.checkout}

    // res.send({params});
}
exports.operation_checkout = function (req, res) {
    let sql = `UPDATE parcels set dateOnRoute = NOW() , status = 2 , messengerPost = ${req.body.checkout}`;
    let query = db.query(sql, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send('OK')
    })
}
exports.operation_deliver = function (req, res) {

    mysqlStatements.deliverParcel(req.body.wayBill, req.body.status);

    res.send("OK");
}
// Vendor Management

exports.operation_getVendor = function (req, res) {
    res.render('operations/add_vendor')
}
exports.operation_addVendor = function (req, res) {
    var Vendor = {
        code: req.body.code,
        name: req.body.name,
        mobile: req.body.mobile,
        telephone: req.body.telephone,
        address: req.body.address,
        status: 1

    }
    let sql = 'INSERT INTO vendors SET ?';
    let query = db.query(sql, Vendor, (err, result) => {
        if (err) res.send(err);
        res.redirect('/ops/dashboard');
    });

}
// Area

exports.opreration_getArea = function (req, res) {
    res.render('operations/add_area');
}

// exports.status = function (req, res) {
//     res.render('int');
// }te