const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
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
//Stripe payments


//Routes
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/admin/', require('./routes/admin'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/basket', require('./routes/basket'));
app.use('/api/v1/orders', require('./routes/orders'));

// Turn error into JSON object
const errorToJson = require('./middleware/errorToJson');
app.use(errorToJson);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline.bold
  )
);
