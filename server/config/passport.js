var JWTStrategy = require("passport-jwt").Strategy;
var User = require("../Users");
var Admin = require("../admin");
var opts = {};
opts.secretOrKey = "kslkdlkhiy8iyiuiuh87y87yhhyg87yugug78uyiy9y87dls";

var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
};

opts.jwtFromRequest = cookieExtractor;

module.exports = function (passport, role) {
    passport.use(
        new JWTStrategy(opts, function (jwt_payload, cb) {
            // console.log("jwtPayload" + JSON.stringify(jwt_payload));
            if (role == 'student') {
                User.findOne({ email: jwt_payload.email })
                    .then(function (data) {
                        return cb(null, data);
                    })
                    .catch(function (err) {
                        console.log(err);
                        return cb(err, false);
                    });
            } else {
                Admin.findOne({ email: jwt_payload.email })
                    .then(function (data) {
                        return cb(null, data);
                    })
                    .catch(function (err) {
                        console.log(err);
                        return cb(err, false);
                    });
            }
        })
    );
};