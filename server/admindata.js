const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    city:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    }
});

module.exports =  mongoose.model('admindata', adminSchema)