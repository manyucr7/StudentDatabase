const express = require('express');
const app = express();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var cors = require('cors')
const alienRouter = require('./router')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var passport=require('passport');
require('./config/passport')(passport);
// const passport.authenticate('jwt', {session: false}) = (req, res, next) => {
//   const token = req.cookies.jwt;
//   //check json web token exists & is verified
//   if (token) {
//     jwt.verify(token, 'secret key', (err, decodedToken) => {
//       if (err) {
//         console.log(err.message);
//         res.status(401);
//         res.redirect('/');
//       }else {
//         res.status(200);
//         console.log(decodedToken);
//         next();
//       }
//     })
//   }
//   else{
//     res.send('');
//   }
// }
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('client'))
app.use(cookieParser());
app.use(alienRouter)
app.use(passport.initialize());

mongoose.connect("mongodb+srv://manyu123:manyucr7@rest.xkl2a.mongodb.net/db?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => {
    console.log(`Connection to database established`)
  }).catch(err => {
    console.log(`db error ${err.message}`);
    process.exit(-1)
  })

app.use('/', passport.authenticate('jwt', {session: false}),alienRouter)
app.use('/posts', passport.authenticate('jwt', {session: false}), alienRouter)
app.use('/myposts', passport.authenticate('jwt', {session: false}), alienRouter)
app.use('/place', passport.authenticate('jwt', {session: false}), alienRouter)
app.use('/seed', passport.authenticate('jwt', {session: false}), alienRouter)
app.use('/create',passport.authenticate('jwt', {session: false}),alienRouter)
app.listen(3000)