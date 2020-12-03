const mongoose = require('mongoose');
const { ObjectId } = mongoose.SchemaTypes;
const orderSchema = new mongoose.Schema({
  products: { type: [{}] },
  transaction_id: { type: String },
  amount: { type: Number },
  address: { type: String },
  status: {
    type: String,
    default: 'Not processed',
    enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  },
  user: { type: ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Order', orderSchema);
