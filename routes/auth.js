const express = require('express');
const {
  persistUser,
  register,
  login,
  loadUser,
  getCurrentUser,
  passwordResetTokenGen,
  resetPassword,
} = require('../controllers/auth');
const { authCheck } = require('../middleware/authCheck');
const router = express.Router();

router.post('/register', register);
router.post('/loaduser', authCheck, loadUser);
router.post('/persistuser', persistUser);
router.post('/login', login);
router.get('/me', authCheck, getCurrentUser);
router.post('/reset', passwordResetTokenGen);
router.put('/reset/:resettoken', resetPassword);
module.exports = router;
