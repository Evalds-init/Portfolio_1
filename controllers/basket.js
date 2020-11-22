const Basket = require('../models/Basket');
const ErrorResponse = require('../utils/errorResponse');
const asyncResolver = require('../middleware/asyncResolver');
const User = require('../models/User');
const Product = require('../models/Product');
const stripe = require('stripe')(
  'sk_test_51HpavkGL4I6BvuCEbBomdC59t7fhP4NvjAYSdxnkRH7ceHPiDyhUAujDw4hzF5tF1o7SRn3PZy9ZPzDoNDdhxvRH00cLusVHSi'
);
//@desc add to users basket
//@route PUT /api/v1/basket/:id/addtobasket
//@access Private
exports.addToBasket = asyncResolver(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: { basket: req.params.id },
    },
    {
      new: true,
    }
  );

  res.status(201).json({ success: true, data: user });
});
//@desc get basket items
//@route GET /api/v1/basket/getitems
//@access Private
exports.getItems = asyncResolver(async (req, res, next) => {
  let items = await Product.find({
    _id: {
      $in: req.user.basket,
    },
  });

  res.status(200).json({ success: true, data: items });
});

//@desc delete basket item
//@route DELETE /api/v1/basket/deleteitem/:id
//@access Private
exports.deleteItem = asyncResolver(async (req, res, next) => {
  const user = await User.updateOne(
    { _id: req.user.id },
    { $pull: { basket: req.params.id } }
  );

  res.status(200).json({ success: true });
});

//@desc Create Stripe Checkout Session
//@route POST /api/v1/basket/create-checkout-session
//@access Private
exports.createCheckoutSession = asyncResolver(async (req, res, next) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/account',
    cancel_url: 'http://localhost:3000/account',
  });
  res.json({ id: session.id });
});
