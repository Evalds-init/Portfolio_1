const mongoose = require('mongoose');
const { ObjectId } = mongoose.SchemaTypes;

const basketSchema = new mongoose.Schema({
  items: {
    type: [{ product: { type: ObjectId }, quantity: { type: Number } }],
    default: [],
  },
});

module.exports = mongoose.model('Basket', basketSchema);
