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
            res.redirect('/ops/add');
        }
        

    })

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
            console.log('duplicate')
        }
        res.send('Vendor Created')
    })
}

// exports.status = function (req, res) {
//     res.render('int');
// }te