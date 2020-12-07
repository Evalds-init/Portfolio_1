const express = require('express');
const { authCheck } = require('../middleware/authCheck');
const {
  addToBasket,
  getItems,
  deleteItem,
  createCheckoutSession,
} = require('../controllers/basket');
const router = express.Router();
router.use(authCheck);
router.put('/:id/addtobasket', addToBasket);
router.get('/getitems', getItems);
router.post('/checkout', createCheckoutSession);
router.delete('/deleteitem/:id', deleteItem);
module.exports = router;
