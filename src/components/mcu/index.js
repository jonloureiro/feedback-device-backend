const routes = require('./mcu.routes');
const { checkMcu } = require('./mcu.service');


module.exports = (app) => {
  app.use(routes);
};

module.exports.checkMcu = checkMcu;
