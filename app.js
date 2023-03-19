const express = require('express');
// const morgan = require('morgan')
const path = require('path');
const cookieparser = require('cookie-parser');
// const expressHandlerbars = require('express-handlebars')
// const flash = require('connect-flash');
const session = require('express-session')
// const mongoose = require('mongoose');
const passport = require('passport');
require('../Backend/db/dbconnection')
// mongoose.Promise= global.Promise
// mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true')

// 1 
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  cookie: { maxAge: 1000000 },
  secret: 'connect.sid',
  saveUninitialized: true,
  resave: false,
}));

app.use(passport.initialize())
app.use(passport.session())




app.use('/',require('./routes/index'))
app.use('/',require('./routes/users'))


app.listen(5000, () => console.log('Server started listening on port 5000!'))