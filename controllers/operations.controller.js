const Product = require('../models/product.model');
const Vendor = require('../models/product.model');
const messenger = require('../models/messenger.model');
const User = require('../models/user.model');


//Simple version, without validation or sanitation

exports.operation_home = function(req,res){
    res.render('operations/index');
}
exports.operation_auth = function(req,res){
    // Auth logic

    // if success 
    res.send('Dashboard');
}

exports.operation_addUser = function(req,res){
    let user = new User({
        userID: 0 ,
        email: "christian.ian.banzon@outlook.com",
        firstName:"Christian",
        lastNane:"Banzon",
        mobile: 09173012212,
        isActive:true
    })
    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Vendor Created')
    })
}

// exports.status = function (req, res) {
//     res.render('int');
// }te