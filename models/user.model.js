const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userID:{type: Number, required: true},
    email:{type: String, required: true},
    firstName:{type: String, required:true},
    lastNane:{type: String, required:true},
    mobile:{type: Number, required:true},
    isActive:{type:Boolean, required:true}

})


module.exports = mongoose.model('User', UserSchema);