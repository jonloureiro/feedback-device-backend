const user = require('./user');
const mcu = require('./mcu');
const data = require('./data');


module.exports = (app) => {
  user(app);
  mcu(app);
  data(app);
};
