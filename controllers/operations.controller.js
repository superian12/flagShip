const db = require('./../config/db');
const parcelSQL = require('./../config/functions/parcels');
const messengerSQL = require('./../config/functions/messenger');
const areaSQL = require('./../config/functions/area');
const mysqlStatements = require('./../config/functions/system_functions');
const passport = require('../config/passport');
const hash = require('sha256');
const vendorSQL = require('./../config/functions/vendors');
//Simple version, without validation or sanitation

exports.operation_home = function (req, res) {
    res.render('operations/index');
}
exports.operation_auth = function (req, res) {

    let user = { email, password } = req.body
    statement = `SELECT * FROM users where email = '${user.email}' AND password = '${hash(user.password)}' AND hasAccess = 1 AND status =1`;
    db.query(statement, (err, user) => {
        if (err) console.log(err, null);
        result = user
        if (user.length == 0) {
            res.redirect("/ops")
        } else {
            authSession = req.session;
            authSession.user = email;
            res.redirect('/ops/dashboard');
            // Create Session
        }

    })



}

exports.operation_addUser = function (req, res, next) {

}
exports.operation_dashboard = function (req, res) {
    if (passport.isAuth()) {
        parcelSQL.getcard(function (err, parcel) {
            parcelSQL.getVendor(function (err, vendor_list) {
                areaSQL.getActiveArea((err, area) => {
                    res.render('operations/dashboard', { parcel, vendor_list, area })
                })

            })

        });
    } else {
        res.redirect('/ops/')
    }

}
// PARCEL MANAGEMENT
exports.operation_viewParcel = async function (req, res, next) {

    if (passport.isAuth()) {
        parcelSQL.getActiveParcel((err, parcels) => {
            parcelSQL.getVendor((err, vendor_list) => {
                messengerSQL.getActiveMessenger((err, messenger_list) => {
                    areaSQL.getActiveArea((err, area_list) => {
                        parcelSQL.getExportParcel((err, checkout_list) => {
                            parcelSQL.getDeliveryParcel((err, deliver_list) => {
                                res.render('operations/view_parcel', { parcels, vendor_list, messenger_list, area_list, checkout_list, deliver_list });
                            })
                        })
                    })
                })
            })
        })
    } else {
        res.redirect('/ops')
    }

}

exports.operation_addParcel = function (req, res, next) {

    if (passport.isAuth()) {
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
            isPayed: true,
            amount: req.body.amount
        };

        let sql = 'INSERT INTO parcels SET dateGenerated = NOW(), ?';
        let query = db.query(sql, postData, (err, result) => {
            if (err) res.send(err);
            console.log(result);
            res.redirect('/ops/viewparcel');
        });
    } else {
        res.redirect('/ops')
    }
}

exports.operation_testparser =  function (req, res) {

    var context = req.body.context
    res.send(hash(context));

}

exports.operation_manageParcel = function (req, res) {
    // res.render('operations/manage_parcel');
    if (passport.isAuth()) {
        waybill = req.params.waybill
        let sql = `SELECT * FROM parcels WHERE waybill = '${waybill}'`;
        let query = db.query(sql, (err, result) => {
            if (err) console.log(err);
            list = result[0]
            // res.send(result[0]);
            res.render('operations/manage_parcel', { list });
        });
    } else {
        res.redirect('/ops')
    }
}
exports.operation_checkoutParcel = function (req, res) {
    if (passport.isAuth()) {
        let sql = `UPDATE parcels set dateOnRoute = NOW() , status = 2 , messengerPost = ${req.body.checkout} WHERE wayBill = '${req.body.waybill}' `;
        let query = db.query(sql, (err, result) => {
            if (err) console.log(err);
            console.log(result);
            res.redirect('/ops/viewparcel')
        })
    } else {
        res.redirect('/ops');
    }
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

    if (passport.isAuth()) {
        mysqlStatements.deliverParcel(req.body.wayBill, req.body.status);

        res.redirect('/ops/viewparcel');
    } else {
        res.redirect('/ops')
    }
}
// Vendor Management

exports.operation_getVendor = function (req, res) {
    if (passport.isAuth()) {
         res.render('operations/add_vendor') 
    }
    else {
        res.redirect('/ops');
    }
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
        var message
        res.redirect('/ops/dashboard');
    });

}
// Area

exports.opreration_getArea = function (req, res) {
    res.render('operations/add_area');
}
exports.opreration_addArea = function (req, res) {
    const data = {
        areaName: req.body.areaName,
        type: req.body.areaType,
        // areaName: 'Navotas',
        // type: 1,
        inService: true
    }
    statement = "INSERT INTO areas SET ? ";
    db.query(statement, data, (err, result) => {
        if (err) console.log(err);
        var message = { ok: 1 };
        res.redirect('dashboard');
    })
}

exports.operation_viewUsers = function (req, res) {
    messengerSQL.getActiveMessenger((err, messenger) => {
        res.render('operations/manage_user', { messenger });
    });

}
exports.operations_addUsers = (req, res) => {
    let messengers = {
        code: req.body.code,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNo: req.body.mobile,
        email: 'NONE',
        password: 'NONE',
        roleID: 2,
        status: 1,
        hasAccess: false
    }
    const statement = "INSERT into users SET ?";
    db.query(statement, messengers, (err, result) => {
        if (err) console.log(err);
        res.redirect('/ops/users')
    })
    // res.send(messengers);

}


// exports.status = function (req, res) {
//     res.render('int');
// }te