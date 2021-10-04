const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    maths: {
        type: Number,
        required: true
    },
    english: {
        type: Number,
        required: true
    },
    hindi: {
        type: Number,
        required: true
    },
    science: {
        type: Number,
        required: true
    },
    french: {
        type: Number,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    }, 
    city: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema)