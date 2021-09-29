const mongoose = require('mongoose');
const { isEmail } = require('validator');
const UserSchema = new mongoose.Schema({

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
UserSchema.statics.login = function (email, password) {

    return User.findOne({ email: email }).then(user => {
        if (password == user.password) {
            return user;
        }else{
            return "invalid";
        }
    }).catch(err => console.log(err));

}
const User = mongoose.model('user', UserSchema);
module.exports = User;