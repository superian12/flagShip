const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chalk = require('chalk');
const debug = require('debug')('app');
const product = require('./routes/product.route'); // Imports routes for the products
const ops = require('./routes/operation.route');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./config/db');
// app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(__dirname + '/src'));
app.disable('view cache');

// Set up mongoose connection
// const mongoose = require('mongoose');
// let dev_db_url = 'mongodb://localhost:27017/courier';
// let mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cookies and Sessions
app.use(cookieParser())
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);
// use Routes
app.use('/products', product);
app.use('/ops', ops)

// View Engine
app.set('views', './views');
app.set('view engine', 'ejs')

app.get('/', function (req, res, next) {
    res.render('index');
})

app.post('/track', function (req, res, next) {
    var wayBill = req.body.waybill;
    
    const statement = `select p.wayBill , a.areaName, date_format(p.dateGenerated,'%d/%m/%y') as dateGenerated ,date_format(p.dateOnRoute,'%d/%m/%y') as dateOnRoute ,date_format(p.dateDelivered,'%d/%m/%y') as dateDelivered,p.status , u.firstName , u.lastName FROM parcels p INNER JOIN areas a ON a.areaID = p.area INNER JOIN users u ON u.userID = p.messengerPost WHERE wayBill = ${wayBill}`;
    db.query(statement,(err,result)=>{
        // if(err) res.send(err)
        if(!result.length){
            res.render('track');
            console.log('NODATAFOUND')
        }
        else res.render('track',{result});
        // res.send({result})
    })
    
})
app.get('/:id', (req, res) => {
    
 
})

// Vendor Login Portal

app.get('/login',(req,res) => {
    res.render('login');
})

let port = 80;
// error 404
app.get('*', function (req, res) {
    // res.send('Ero', 404);
    res.redirect('/');


});

app.listen(port, () => {
    debug(`Listening on port ${chalk.green(port)}`);
})