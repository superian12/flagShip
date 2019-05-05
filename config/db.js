var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'ls-964a7eb92c94dbdb7b95dea9c3308bd8bb682711.cgs1hrdaq2sg.ap-southeast-1.rds.amazonaws.com',
    user     : 'dbmasteruser',
    // host     : 'localhost',
    // user     : 'root',
    password : 'Banzon!1397',
    database : 'd2name'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected')
});

module.exports = connection;