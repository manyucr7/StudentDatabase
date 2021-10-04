const express = require('express');
const app = express();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var cors = require('cors')
const alienRouter = require('./router')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var passport = require('passport');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('client'))
app.use(cookieParser());
app.use(alienRouter)
app.use(passport.initialize());
var auth = passport.authenticate('jwt', { session: false })
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
app.post('/getRoleValue', (req, res) => {
  var role = req.body.data.myrole;
  require('./config/passport')(passport, role);
  auth = passport.authenticate('jwt', { session: false })
  res.send('done')
})
app.use('/', auth, alienRouter)
app.use('/info',alienRouter)
app.use('/posts',auth, alienRouter)
app.use('/myposts', auth, alienRouter)//analytics
app.use('/topindia', auth, alienRouter)//analytics
app.use('/topcity', auth, alienRouter)//analytics
app.use('/create', auth, alienRouter)//add data
app.use('/sendSchool',auth, alienRouter)//
app.use('/getCity',auth, alienRouter)
app.use('/getRegion',auth, alienRouter)
app.use('/getarea', auth,alienRouter)
app.listen(3000)