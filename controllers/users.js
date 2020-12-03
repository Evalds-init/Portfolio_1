const ErrorResponse = require('../utils/errorResponse');
const asyncResolver = require('../middleware/asyncResolver');
const User = require('../models/User');
const Order = require('../models/Order');
//@desc update user details
//@route PUT /api/v1/users/updatedetails
//@access Private
exports.updateDetails = asyncResolver(async (req, res, next) => {
  const { name, email, tel, lastName } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email, lastName, tel },
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

//@desc create order record after checkout completion
//@route POST /api/v1/users/create-order-record
//@access Private
exports.createOrderRecord = asyncResolver(async (req, res, next) => {
  const { sessionId, total, basket } = req.body;
  console.log(req.body);
  const order = {
    products: basket,
    transaction_id: sessionId,
    amount: total,
    address: req.user.address[0],
    user: req.user.id,
  };
  await User.findByIdAndUpdate(req.user.id, {
    $push: { orderNumbers: sessionId },
  });
  await Order.create(order);

  res.status(200).json({ success: true });
});
