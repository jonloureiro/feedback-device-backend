const user = require('./user');
const mcu = require('./mcu');


module.exports = (app) => {
  user(app);
  mcu(app);
};
