const jwt = require('jsonwebtoken');
const asyncResolver = require('./asyncResolver');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Private routes
exports.authCheck = asyncResolver(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  // Check for token
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

//Grant access to particular roles
exports.roleAuthorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `Users' role ${req.user.role} is not authorized to perform this action`,
          403
        )
      );
    }
    next();
  };
};
