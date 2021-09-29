const mongoose = require('mongoose');
const { isEmail } = require('validator');
const AdminSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter an password'],

    }
});
AdminSchema.statics.login = function (email, password) {

    return Admin.findOne({ email: email }).then(admin => {
        if (password == admin.password) {
            return admin;
        }else{
            return "invalid";
        }
    }).catch(err => console.log(err));

}
const Admin = mongoose.model('admin', AdminSchema);
module.exports = Admin;