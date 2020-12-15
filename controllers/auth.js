const ErrorResponse = require('../utils/errorResponse');
const asyncResolver = require('../middleware/asyncResolver');
const User = require('../models/User');
const Basket = require('../models/Basket');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

//@desc Register user
//@route POST /api/v1/auth/register
//@access Public

exports.register = asyncResolver(async (req, res, next) => {
  let user = await User.create(req.body);
  let basket = new Basket();
  user.basketId = basket._id;
  basket.user = user.id;
  user = await user.save();
  await basket.save();
  //Create JWT token and send it in cookies
  let temp = process.env.TEMPORARY_COKIE_EXPIRE * 60 * 1000;
  sendTokenInCookie(user, 200, res, temp);
});

//@desc Login user
//@route POST /api/v1/auth/login
//@access Public

exports.login = asyncResolver(async (req, res, next) => {
  const { email, password } = req.body;
  //Validation
  if (!email || !password) {
    return next(new ErrorResponse('Creadentials missing', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  // Cookies expire in 30 minutes
  let expiryDate = 30 * 60 * 1000;
  //Create JWT token and send it in cookies
  sendTokenInCookie(user, 200, res, expiryDate);
});
//@desc Persist user
//@route get /api/v1/auth/persistuser
//@access Public

exports.persistUser = asyncResolver(async (req, res, next) => {
  const { email, password } = req.body;
  //Validation
  if (!email || !password) {
    return next(new ErrorResponse('Creadentials missing', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  // Cookies expire in 365 days
  let expiryDate = 365 * 24 * 60 * 60 * 100;
  sendTokenInCookie(user, 200, res, expiryDate);
});
//@desc Load User (if cookies persisted)
//@route POST /api/v1/auth/loaduser
//@access Public

exports.loadUser = asyncResolver(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});

//Get token , create cookie
const sendTokenInCookie = (user, statusCode, res, time) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + time),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .cookie('cookieCheck', 'cookieExists', {
      httpOnly: false,
      expires: new Date(Date.now() + time),
    })
    .json({ success: true, data: user });
};

//@desc Password reset token generation
//@route POST /api/v1/auth/reset
//@access Public
exports.passwordResetTokenGen = asyncResolver(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse('Invalid email', 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //Create reset url

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/reset/${resetToken}`;
  const message = `Please click on the link bellow to reset your password`;
  console.log(resetUrl);
  try {
    await sendEmail({
      email: 'evaldsi@outlook.com',
      subject: 'Welcome to the club',
      message: `You are receiving this email because you or someoneelse has requested the reset of a password. Please press on the link bellow to reset your password <br>${resetUrl}`,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});
//@desc Reset password
//@route PUT /api/v1/auth/reset/:resettoken
//@access Public
exports.resetPassword = asyncResolver(async (req, res, next) => {
  //Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }
  //Set a new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendTokenInCookie(user, 200, res);
});
//@desc Get current user
//@route POST /api/v1/auth/me
//@access Private
exports.getCurrentUser = asyncResolver(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});
