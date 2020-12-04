const express = require('express');
const {
  updateDetails,
  updatePassword,
  createOrderRecord,
  updateAddress,
  deleteAddress,
  addAddress,
} = require('../controllers/users');
const { authCheck } = require('../middleware/authCheck');
const router = express.Router();
//Check authorization
router.use(authCheck);

// Admin functionality
router.put('/updatedetails', updateDetails);
router.put('/updatepassword', updatePassword);
router.put('/updateaddress', updateAddress);
router.post('/addaddress', addAddress);
router.delete('/:id/deleteaddress', deleteAddress);
router.post('/create-order-record', createOrderRecord);
module.exports = router;
