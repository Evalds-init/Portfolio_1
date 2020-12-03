const express = require('express');
const { authCheck } = require('../middleware/authCheck');
const { getOrders } = require('../controllers/orders');
const router = express.Router();
router.use(authCheck);
router.get('/getorders', getOrders);

module.exports = router;
