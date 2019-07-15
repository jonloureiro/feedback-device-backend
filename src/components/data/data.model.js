const mongoose = require('../../database');


const dataSchema = new mongoose.Schema({
  three: {
    type: Number,
    required: true,
  },
  two: {
    type: Number,
    required: true,
  },
  one: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model('Data', dataSchema);
