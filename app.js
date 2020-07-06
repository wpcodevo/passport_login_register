const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('passport');


// PASSPORT CONFIG
require('./config/passport')(passport)

// ENV CONFIG
dotenv.config({
  path: './config/config.env'
});

const app = express();

// LOGGER
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// DB CONFIG
require('./config/db')();

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// SESSION
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))

// CONNECT-FLASH
app.use(flash())

// GLOBAL VARS
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// BODY PARSER
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())


// ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);