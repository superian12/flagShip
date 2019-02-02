const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
});

let VendorSchema = new Schema({
    userID: {type: Number, required: true},
    name: {type: String, required: true, max: 100},
    tel: {type: Number, required:true},
    mobile: {type:Number, required:true}

})

// Export the model
module.exports = mongoose.model('Product', ProductSchema);
module.exports = mongoose.model('Vendor', VendorSchema);