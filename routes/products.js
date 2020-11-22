const express = require('express');
const advancedQueries = require('../middleware/advancedQueries');
const Product = require('../models/Product');
const { authCheck } = require('../middleware/authCheck');

const {
  deleteProduct,
  updateProduct,
  createProduct,
  getProduct,
  getProducts,
  getProductsByCategory,
} = require('../controllers/products');
const router = express.Router();

router
  .route('/:id')
  .get(getProduct)
  .put(authCheck, updateProduct)
  .delete(authCheck, deleteProduct);
router.route('/').get(advancedQueries(Product), getProducts);
router.route('/').post(authCheck, createProduct);
router.route('/categories/:category').get(getProductsByCategory);
module.exports = router;
