const bodyParser = require('koa-bodyparser');

const auth = require('./auth');
const error = require('./error');

module.exports = (app) => {
  app.use(error);
  app.use(bodyParser());
};

module.exports.auth = auth;
