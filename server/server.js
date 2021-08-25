const express = require('express');
const app = express();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var cors = require('cors')
const alienRouter = require('./router')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  //check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'secret key', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/');
      }else {
        console.log(decodedToken);
        next();
      }
    })
  }
  else{
    res.send('');
  }
}
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('client'))
app.use(cookieParser());
app.use(alienRouter)

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

app.use('/', requireAuth,alienRouter)
app.use('/posts', requireAuth, alienRouter)
app.use('/myposts', requireAuth, alienRouter)
app.use('/place', requireAuth, alienRouter)
app.use('/seed', requireAuth, alienRouter)
app.use('/create',requireAuth,alienRouter)
app.listen(3000)