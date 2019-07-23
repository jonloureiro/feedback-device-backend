const bcrypt = require('bcrypt');
const mongoose = require('../../database');
const { saltRounds } = require('../../config');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, saltRounds);
});


module.exports = mongoose.model('User', userSchema);
