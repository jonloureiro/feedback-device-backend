const mongoose = require('../../database');


const dataSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  mcu: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model('Data', dataSchema);
