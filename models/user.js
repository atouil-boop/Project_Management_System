const { default: mongoose } = require('mongoose');
require('../config/connect');
const User=mongoose.Schema({
    fullname:{type:String,required:true},
    date:{type:Date, default:Date.now},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    tel:{type:Number,required:true},
    role:{type:String,default:'user'},
    tags:{type:Array,default:[]},
    image:{type:String},
    
})
module.exports=mongoose.model('User',User);
