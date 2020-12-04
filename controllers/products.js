const ErrorResponse = require('../utils/errorResponse');
const asyncResolver = require('../middleware/asyncResolver');
const Product = require('../models/Product');
const advancedQueries = require('../middleware/advancedQueries');
//@desc Get single product
//@route Get /api/v1/products/:id
//@access Public

exports.getProduct = asyncResolver(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorResponse('Resource not fount', 404));
  }
  res.status(200).json({ success: true, data: product });
});

//@desc Get all products
//@route Get /api/v1/products
//@access Public

exports.getProducts = asyncResolver(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({ success: true, data: products });
});
//@desc Create a product
//@route POST /api/v1/:userId/products
//@access Private

exports.createProduct = asyncResolver(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, data: product });
});
//@desc Update a product
//@route PUT /api/v1/products/:id
//@access Private

exports.updateProduct = asyncResolver(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ success: true, data: product });
});
//@desc Delete product
//@route DELETE /api/v1/products/:id
//@access Private

exports.deleteProduct = asyncResolver(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: product });
});

//@desc Get filter products by category
//@route Get /api/v1/products/:category
//@access Public

exports.getProductsByCategory = asyncResolver(async (req, res, next) => {
  const products = await Product.find({ category: req.params.category });

  res.status(200).json({ success: true, data: products });
});
