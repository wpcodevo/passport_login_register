const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// ENV CONFIG
dotenv.config({ path: './config/config.env' });

const app = express();

// LOGGER
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// DB CONFIG
require('./config/db')();

// ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);
