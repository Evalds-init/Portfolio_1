const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const basketSchema = new mongoose.Schema({
  buyer: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'Please provide a valid user id'],
  },
  
});

module.exports = mongoose.model('Basket', basketSchema);
