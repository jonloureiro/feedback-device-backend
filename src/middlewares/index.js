const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

const auth = require('./auth');
const error = require('./error');


module.exports = (app) => {
  app.use(error);
  app.use(bodyParser());
  app.use(session(app));
};

module.exports.auth = auth;
