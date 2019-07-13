const routes = require('./mcu.routes');


module.exports = (app) => {
  app.use(routes);
};
