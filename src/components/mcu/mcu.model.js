const mongoose = require('../../database');


const mcuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model('Mcu', mcuSchema);
