const routes = require('./data.routes');
const mqtt = require('./data.mqtt');


module.exports = (app) => {
  app.use(routes);
  mqtt();
};
