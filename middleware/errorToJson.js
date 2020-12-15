const ErrorResponse = require('../utils/errorResponse');

const errorToJson = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.name === 'CastError') {
    const message = `Resource with id ${err.value} not found`;
    error = new ErrorResponse(message, 404);
  }
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(
      err.keyValue
    )} field value entered`;
    error = new ErrorResponse(message, 500);
  }
  if (err.name === 'TypeError') {
    const message = `Invalid Data Type`;
    error = new ErrorResponse(message, 400);
  } else {
    console.log(error);
    error = new ErrorResponse(error.message, 500);
  }

  res.status(error.statusCode || 500).json({
    sucess: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorToJson;
