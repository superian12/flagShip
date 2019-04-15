var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    // host     : 'ls-8b7b190fe9a79debba58ea98927b8912677e3a6d.cgs1hrdaq2sg.ap-southeast-1.rds.amazonaws.com',
    // user     : 'dbmasteruser',
    password : 'Banzon!1397',
    database : 'd2name'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected')
});

module.exports = connection;