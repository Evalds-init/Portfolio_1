const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [32, 'Maximum allowed character limitexceeded'],
  },

  description: {
    type: String,
    maxlength: [1000, 'Maximum allowed character limit exceeded'],
  },
  price: {
    type: Number,
    maxlength: 32,
  },
  category: {
    type: String,
    enum: ['cosmetics', 'skincare', 'haircare'],
    default: 'cosmetics',
  },
  purchaseQuantity: {
    type: Number,
    default: 1,
  },
  quantity: {
    type: Number,
  },
  sold: {
    type: Number,
    default: 0,
  },
  photo: {
    type: [String],
  },
  ratings: {
    type: [Number],
    default: [],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 10'],
  },
  averageRating: {
    type: Number,
    default: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.post('save', function () {
  if (this.ratings.length !== 0) {
    this.averageRating =
      this.ratings.reduce((num, acc) => num + acc) / this.ratings.length;
  }
});

productSchema.post('remove', function () {
  if (this.ratings.length !== 0) {
    this.averageRating =
      this.ratings.reduce((num, acc) => num + acc) / this.ratings.length;
  }
});
module.exports = mongoose.model('Product', productSchema);
