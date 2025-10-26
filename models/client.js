const { default: mongoose } = require('mongoose');
require('../config/connect');
const Client=mongoose.Schema({
    fullname:{type:String,required:true},
    date:{type:Date, default:Date.now},
    email:{type:String,unique:true,required:true},
    address:{type:String,required:true},
    tel:{type:Number,required:true},
    image:{type:String},
    
})
module.exports=mongoose.model('Client',Client);