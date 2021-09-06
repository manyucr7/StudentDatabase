const User = require('./Users');
const jwt = require('jsonwebtoken');
function handleError(err) {
    console.log(err.message, err.code);
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (usr) => {
    let params={
        email:usr.email,
        password:usr.password

    }
    return jwt.sign(params, 'kslkdlkhiy8iyiuiuh87y87yhhyg87yugug78uyiy9y87dls', { expiresIn: maxAge });
}
module.exports.signup_post = (req, res) => {
    const { gname, pw } = req.body;
    User.create({ email: gname, password: pw }).then(usr => {
        res.status(200);
        res.json({ usr: usr._id });
    }).catch(err => {
        handleError(err)
        res.status(400).send('error, user not created')
    })
}
module.exports.login_post = (req, res) => {
    const { gname, pw } = req.body;
    User.login(gname, pw).then(u => {
        const token = createToken(u);
        res.cookie('jwt', token, { maxAge: maxAge * 1000 });
        res.json({ user: u });
        res.status(200);
    }).catch(err => {
        res.status(400).send('Login Error');
        console.log('Login Error');
    })
}
module.exports.logout_get = (req, res) =>{
    res.cookie('jwt', '', {maxAge :  1});
    res.redirect('/');
}