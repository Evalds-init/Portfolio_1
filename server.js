const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
const path = require('path');
//Load dotenv variables
require('dotenv').config({ path: 'config/config.env' });
require('colors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

//Connect to DB
const connectDB = require('./config/db');
connectDB();
//Body parser
app.use(express.json());
//Cookie parser
app.use(cookieParser());

//Dev req logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// File uploading
app.use(fileupload());

//Routes
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/admin/', require('./routes/admin'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/basket', require('./routes/basket'));
app.use('/api/v1/orders', require('./routes/orders'));
if ((process.env.NODE_ENV = 'production')) {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Turn error into JSON object
const errorToJson = require('./middleware/errorToJson');
app.use(errorToJson);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline.bold
  )
);
