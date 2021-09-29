const mongoose = require('mongoose');

const adminSchool = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    school:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    }
});

module.exports =  mongoose.model('adminSchool', adminSchool)