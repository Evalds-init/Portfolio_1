const express = require('express');
const { updateDetails, updatePassword } = require('../controllers/users');
const { authCheck } = require('../middleware/authCheck');
const router = express.Router();
//Check authorization
router.use(authCheck);

// Admin functionality
router.put('/updatedetails', updateDetails);
router.put('/updatepassword', updatePassword);

module.exports = router;
