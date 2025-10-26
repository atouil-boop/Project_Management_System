const { default: mongoose } = require('mongoose');
require('../config/connect');
const Board=mongoose.Schema({
    idProject:{type:mongoose.Schema.Types.ObjectId,ref:'Project'},
    date:{type:Date, default:Date.now},
    backlog:{type:Array,default:[]},
    inprogress:{type:Array,default:[]},
    completed:{type:Array,default:[]},
    inhold:{type:Array,default:[]},
})
module.exports=mongoose.model('Board',Board);
