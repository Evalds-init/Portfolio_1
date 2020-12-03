const ErrorResponse = require('../utils/errorResponse');
const asyncResolver = require('../middleware/asyncResolver');
const User = require('../models/User');
const Basket = require('../models/Basket');
const Product = require('../models/Product');
const Stripe = require('stripe');
const Order = require('../models/Order');

//@desc add to users basket
//@route PUT /api/v1/basket/:id/addtobasket
//@access Private
exports.addToBasket = asyncResolver(async (req, res, next) => {
  await Basket.findByIdAndUpdate(
    req.user.basketId,
    {
      $push: { items: req.body },
    },
    {
      new: true,
    }
  );

  res.status(201).json({ success: true });
});
//@desc get basket items
//@route GET /api/v1/basket/getitems
//@access Private
exports.getItems = asyncResolver(async (req, res, next) => {
  const basket = await Basket.findById(req.user.basketId);
  if (basket.items.length !== 0) {
    const data = basket.items.map(function (item) {
      return item.product;
    });

    let items = await Product.find({
      _id: {
        $in: data,
      },
    });

    res.status(200).json({ success: true, data: items });
  } else {
    res.status(200).json({ success: true, data: [] });
  }
});

//@desc delete basket item
//@route DELETE /api/v1/basket/deleteitem/:id
//@access Private
exports.deleteItem = asyncResolver(async (req, res, next) => {
  await Basket.updateOne(
    { _id: req.user.basketId },
    { $pull: { items: { product: req.params.id } } }
  );

  res.status(200).json({ success: true });
});
//@desc edit basket item quantity
//@route PUT /api/v1/basket/editquantity/:id
//@access Private
exports.editQuantity = asyncResolver(async (req, res, next) => {
  const user = await User.updateOne(
    { _id: req.user.id },
    { $pull: { basket: req.params.id } }
  );

  res.status(200).json({ success: true });
});

//@desc Create Stripe Checkout Session
//@route POST /api/v1/basket/create-checkout-session
//@access Private
exports.createCheckoutSession = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET);
  const { id, total, basket } = req.body;

  try {
    const response = await stripe.paymentIntents.create({
      payment_method: id,
      currency: 'GBP',
      amount: total * 100,
      confirm: true,
    });
    const data = {
      products: basket,
      transaction_id: id,
      amount: total,
      address: req.user.address[0],
      user: req.user.id,
    };

    const orders = await Order.create(data);
    await Basket.findByIdAndUpdate(req.user.basketId, { items: [] });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};
