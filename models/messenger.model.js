const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MessengerSchema = new Schema({
    userID:{type: Number, required: true},
    firstName:{type: String, required:true},
    lastNane:{type: String, required:true},
    isActive:{type:Boolean, required:true}

})


module.exports = mongoose.model('Messenger', MessengerSchema);