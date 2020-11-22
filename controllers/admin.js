const ErrorResponse = require('../utils/errorResponse');
const asyncResolver = require('../middleware/asyncResolver');
const User = require('../models/User');
const Product = require('../models/Product');
const advancedQueries = require('../middleware/advancedQueries');
const path = require('path');

//AWS init
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
//@desc Get all users
//@route GET /api/v1/admin/users
//@access Private/Admin

exports.getUsers = asyncResolver(async (req, res, next) => {
  res.status(200).json(res.advancedQueries);
});

//@desc Get single user
//@route GET /api/v1/admin/users/:id
//@access Private/Admin

exports.getUser = asyncResolver(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ success: true, data: user });
});

//@desc Create user
//@route POST /api/v1/admin/users
//@access Private/Admin

exports.createUser = asyncResolver(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});

//@desc Update user
//@route PUT /api/v1/admin/users/:id
//@access Private/Admin

exports.updateUser = asyncResolver(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({ success: true, data: user });
});

//@desc Delete user
//@route DELETE /api/v1/admin/users/:id
//@access Private/Admin

exports.deleteUser = asyncResolver(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(201).json({ success: true, data: {} });
});
//@desc Add Product
//@route POST /api/v1/admin/products
//@access Private/Admin

exports.createProduct = asyncResolver(async (req, res, next) => {
  console.log(req.files);
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});
//@desc Add Product Images
//@route POST /api/v1/admin/products/:id/addimages
//@access Private/Admin

exports.addProductImage = asyncResolver(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!req.files) {
    return res.status(201).json({ success: true, data: product });
  }

  const file = req.files.images?.[0] || req.files.images;
  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }
  // Create custom filename
  file.name = `photo_${product._id}${file.name.split('.')[0]}${
    path.parse(file.name).ext
  }`;
  const params = {
    ContentType: 'image/jpeg',
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.name, // File name you want to save as in S3
    Body: file.data,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
  let name = file.name.toString();
  console.log(name);
  const loc = `https://e-commerce-api.s3.eu-west-1.amazonaws.com/${name}`.toString();
  product.photo.push(loc);
  console.log(product);
  product = await product.save();
  res.status(201).json({ success: true, data: product });
});
