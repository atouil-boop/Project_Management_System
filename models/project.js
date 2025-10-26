const mongoose= require('mongoose');
const client = require('./client');
require('../config/connect');
const Project=mongoose.Schema({name:{type: String, required: true},
                               description:{type:String},
                               status:{type:String},
                               client:{type:mongoose.Schema.Types.ObjectId,ref:'Client'},
                               team: {type:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]},
                               startDate:{type:Date},
                               endDate:{type:Date},
                               files:{type:Array,default:[]},
                               budget:{type:Number,default:0}
                            })
                            module.exports=mongoose.model('Project',Project);