const mongoose = require('mongoose');
const { isEmail } = require('validator');
const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter an password'],
        minlength: [6, 'minimum password length is 6 characters']

    }
});
UserSchema.statics.login = function (email, password) {

    return User.findOne({ email: email }).then(user => {
        if (password == user.password) {
            return user;
        }
    }).catch(err => console.log(err));

}
const User = mongoose.model('user', UserSchema);
module.exports = User;