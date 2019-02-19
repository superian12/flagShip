const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    wayBill: {type: String, required: true, max: 100},
    receipient: {type: String, required: true},
    address:{type:String, required:true },
    messenger:{type: Number, required:true}
});

let VendorSchema = new Schema({
    code: {type: Number, required: true, unique: true},
    name: {type: String, required: true, max: 100},
    tel: {type: Number, required:true},
    mobile: {type:Number, required:true},
    address: {type:String, required: true},
    isActive:{type: Boolean, required: true}

})

// let MessengerSchema = new Schema({
//     userID:{type: Number, required: true},
//     firstName:{type: String, required:true},
//     lastNane:{type: String, required:true},
//     isActive:{type:Boolean, required:true}

// })

// Export the model
module.exports = mongoose.model('Product', ProductSchema);
module.exports = mongoose.model('Vendor', VendorSchema);
// module.exports = mongoose.model('Messenger', MessengerSchema);
