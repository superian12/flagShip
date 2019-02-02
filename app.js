const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const product = require('./routes/product.route'); // Imports routes for the products
const app = express();
// app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(__dirname + '/src'));


 

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/courier';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);
app.set('views','./views');
app.set('view engine', 'ejs')

app.get('/',function(req,res){
    res.render('index')
})

let port = 3000;

app.listen(port, () =>{
    console.log('Listeing to port ' + port)
})