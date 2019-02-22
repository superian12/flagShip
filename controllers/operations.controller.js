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


    User.find({email:req.body.email}, {"email":1},function (err, user) {
        if (err) return next(err);
        if(!user.length){
            res.send('No data found')
        }
        else{
            res.redirect('/ops/dashboard');
        }
        

    })

}

exports.operation_addUser = function(req,res, next){
    let user = new User({
        userID: 0 ,
        email: "christian.ian.banzon@gmail.com",
        firstName:"Christian",
        lastNane:"Banzon",
        mobile: 1,
        isActive:true
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
exports.operation_dashboard = function(req,res){
    res.render('operations/dashboard')
}

// exports.status = function (req, res) {
//     res.render('int');
// }te