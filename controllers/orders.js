const ErrorResponse = require('../utils/errorResponse');
const asyncResolver = require('../middleware/asyncResolver');
const Order = require('../models/Order');

//@desc get user orders
//@route GET /api/v1/orders/getorders
//@access Private
exports.getOrders = asyncResolver(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(201).json({ success: true, data: orders });
});
