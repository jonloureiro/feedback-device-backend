const routes = require('./user.routes');
const { checkUser } = require('./user.service');


module.exports = (app) => {
  app.use(routes);
};

module.exports.checkUser = checkUser;
