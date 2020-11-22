const ErrorResponse = require('../utils/errorResponse');
const asyncResolver = require('../middleware/asyncResolver');
const User = require('../models/User');

//@desc update user details
//@route PUT /api/v1/users/updatedetails
//@access Private
exports.updateDetails = asyncResolver(async (req, res, next) => {
  const { name, email, tel, lastName } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email,lastName,tel },
    { new: true, runValidators: true }
  );
  res.status(200).json({ success: true, data: user });
});

//@desc update password
//@route PUT /api/v1/users/updatepassword
//@access Private
exports.updatePassword = asyncResolver(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is invalid', 401));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendTokenResponse(user, 200, res);
});
