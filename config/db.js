var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Banzon!1397',
    database : 'd2name'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected')
});

module.exports = connection;