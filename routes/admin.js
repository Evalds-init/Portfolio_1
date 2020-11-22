const express = require('express');
const User = require('../models/User');
const {
  createProduct,
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  addProductImage
} = require('../controllers/admin');
const { authCheck } = require('../middleware/authCheck');
const advancedQueries = require('../middleware/advancedQueries');
const { get } = require('mongoose');
const router = express.Router();
//Check authorization
router.use(authCheck);

// Admin functionality
router.route('/users').get(advancedQueries(User), getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.post('/products/create', createProduct);
router.post('/products/:id/addimages', addProductImage);
module.exports = router;
