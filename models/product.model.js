const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    wayBill: {type: String, required: true, max: 100},
    recipient: {type: String, required: true},
    address:{type:String, required:true },
    messengerGet:{type: String, required:true},
    messengerDelivered:{type: String},
    area:{type: String, required:true},
    size:{type: Number, required:true},
    vendorID:{type: Number, required:true},
    addOnKg:{type:Number},
    datePickedUp:{type: Date},
    dateOnRoute:{type: Date},
    dateDelivered:{type: Date},
    status:{type: Number, required:true},
    isPayed:{type: Boolean , required:true}
    
});

// let VendorSchema = new Schema({
//     code: {type: Number, required: true, unique: true},
//     name: {type: String, required: true, max: 100},
//     tel: {type: Number, required:true},
//     mobile: {type:Number, required:true},
//     address: {type:String, required: true},
//     isActive:{type: Boolean, required: true}

// })

// let MessengerSchema = new Schema({
//     userID:{type: Number, required: true},
//     firstName:{type: String, required:true},
//     lastNane:{type: String, required:true},
//     isActive:{type:Boolean, required:true}

// })

// Export the model
module.exports = mongoose.model('Product', ProductSchema);
// module.exports = mongoose.model('Vendor', VendorSchema);
// module.exports = mongoose.model('Messenger', MessengerSchema);
