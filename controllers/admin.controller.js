const db = require('../config/db');
const parcelSQL = require('../config/functions/parcels');
const messengerSQL = require('../config/functions/messenger');
const areaSQL = require('../config/functions/area');
const mysqlStatements = require('../config/functions/system_functions');
const passport = require('../config/passport');
const hash = require('sha256');
const vendorSQL = require('../config/functions/vendors');
const reports = require('../models/reports.model');
//Simple version, without validation or sanitation

exports.login = function (req, res) {
    res.render('admin/index');
}
exports.auth =  (req, res) => {

    let user = { email, password } = req.body
    statement = `SELECT * FROM users where email = '${user.email}' AND password = '${hash(user.password)}' AND roleID IN (9,1) AND hasAccess = 1 AND status =1`;
    db.query(statement, (err, user) => {
        if (err) console.log(err, null);
        result = user
        if (user.length == 0) {
            res.send("noDATA")
        } else {
            authSession = req.session;
            authSession.user = email;
            authSession.access = 1

            
            res.redirect('/admin/home');
            
            // Create Session
        }

    })



}

exports.home = (req,res) => {
    if(passport.isAdmin()){
        reports.dailyReportCard((err,card)=>{
            reports.dailyMessengerIn((err,parcelIn)=> {
                reports.dailyMessengerOut((err,parcelOut) =>{
                    res.render('admin/dashboard', {card,parcelIn,parcelOut})
                })
            })
            
        })
    }
    else{
        res.redirect('/admin/')
    }
}

