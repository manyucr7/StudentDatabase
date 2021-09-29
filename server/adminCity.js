const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    area:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
});

module.exports =  mongoose.model('adminCity', adminSchema)