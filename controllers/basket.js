const ErrorResponse = require('../utils/errorResponse');
const asyncResolver = require('../middleware/asyncResolver');
const mongoose = require('mongoose');
const User = require('../models/User');
const Basket = require('../models/Basket');
const Product = require('../models/Product');
const stripe = require('stripe')(
  'sk_test_51HpavkGL4I6BvuCEbBomdC59t7fhP4NvjAYSdxnkRH7ceHPiDyhUAujDw4hzF5tF1o7SRn3PZy9ZPzDoNDdhxvRH00cLusVHSi'
);
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
exports.createCheckoutSession = asyncResolver(async (req, res, next) => {
  let line_items = [];
  let price_data = {};
  line_items = req.body.basket.forEach((item) =>
    line_items.push({
      ...price_data,
      currency: 'GBP',
      name: item.name,
      unit_amount: item.price * 100,
    })
  );
  console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'GBP',
          product_data: {
            name: req.body.basket[0].name,
          },
          unit_amount: 800,
        },
        quantity: req.body.basket[0].purchaseQuantity,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/checkout/success',
    cancel_url: 'http://localhost:3000/checkout/canceled',
  });
  res.json({ id: session.id });
});
