const ErrorResponse = require('../utils/errorResponse');
const asyncResolver = require('../middleware/asyncResolver');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

//@desc Register user
//@route POST /api/v1/auth/register
//@access Public

exports.register = asyncResolver(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  //Create JWT token and send it in cookies
  sendTokenInCookie(user, 200, res);
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

  //Create JWT token and send it in cookies
  sendTokenInCookie(user, 200, res);
});
//@desc Persist user
//@route get /api/v1/auth/persistuser
//@access Private

exports.persistUser = asyncResolver(async (req, res, next) => {
  const user = req.user;
  sendTokenInCookie(user, 200, res);
});

//Get token , create cookie
const sendTokenInCookie = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie('token', token, options)
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
