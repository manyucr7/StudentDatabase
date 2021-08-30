const User = require('./Users');
const jwt = require('jsonwebtoken');
function handleError(err) {
    console.log(err.message, err.code);
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'secret key', { expiresIn: maxAge });
}
module.exports.signup_post = (req, res) => {
    const { gname, pw } = req.body;
    User.create({ email: gname, password: pw }).then(usr => {
        res.json({ usr: usr._id });
    }).catch(err => {
        handleError(err)
        res.status(400).send('error, user not created')
    })
}
module.exports.login_post = (req, res) => {
    const { gname, pw } = req.body;
    User.login(gname, pw).then(u => {
        const token = createToken(u._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000 });
        res.json({ user: u._id });
    }).catch(err => console.log(err))
}
module.exports.logout_get = (req, res) =>{
    res.cookie('jwt', '', {maxAge :  1});
    res.redirect('/');
}