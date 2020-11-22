const ErrorResponse = require('../utils/errorResponse');

const errorToJson = (err, req, res, next) => {
  let error = { ...err };
  console.log(err);
  if (err.name === 'CastError') {
    const message = `Resource with id ${err.value} not found`;
    error = new ErrorResponse(message, 404);
  }
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }
  if (err.name === 'TypeError') {
    const message = `Invalid Data Type`;
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    sucess: false,
    error: err.message || 'Server Error',
  });
};

module.exports = errorToJson;
