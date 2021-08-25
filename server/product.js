const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    branch: String, 
    marks:Number,
    school: String,
    place:String
});

module.exports =  mongoose.model('Product', productSchema)

