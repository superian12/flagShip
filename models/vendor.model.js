const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let VendorSchema = new Schema({
    code: {type: Number, required: true, unique: true},
    name: {type: String, required: true, max: 100},
    tel: {type: Number, required:true},
    mobile: {type:Number, required:true},
    address: {type:String, required: true},
    isActive:{type: Boolean, required: true}

})

module.exports = mongoose.model('Vendor',VendorSchema)