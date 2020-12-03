const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = mongoose.SchemaTypes;
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    enum: ['user', 'merchant', 'admin'],
    default: 'user',
  },
  tel: {
    type: Number,
  },
  history: {
    type: [String],
    default: [],
  },
  basketId: {
    type: ObjectId,
    ref: 'Basket',
  },
  cards: {
    type: [{}],
    default: [],
  },
  address: {
    type: [String],
    default: [],
  },
  orderNumbers: {
    type: [String],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  confirmEmailToken: String,
  isEmailConfirmed: {
    type: Boolean,
    default: false,
  },
  twoFactorCode: String,
  twoFactorCodeExpire: Date,
  twoFactorEnable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//Password encryption
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword.toString(), this.password);
};
//Password token generation
UserSchema.methods.getResetPasswordToken = function () {
  //Set resetPasswordToken and hash token
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 60 * 10 * 1000;
  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
