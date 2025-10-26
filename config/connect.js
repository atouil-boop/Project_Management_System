const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
.then((succ)=>{console.log('connected to db');})
.catch((err)=>{console.log('failed to connect to db',err);});