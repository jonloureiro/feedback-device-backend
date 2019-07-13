const mongoose = require('mongoose');
const { mongodb_uri: uri } = require('../config');


mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});


module.exports = mongoose;
