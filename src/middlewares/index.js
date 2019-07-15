const bodyParser = require('koa-bodyparser');

const error = require('./error');
const auth = require('./auth');
const { bearer } = require('./auth');


module.exports = (app) => {
  app.use(error);
  app.use(bodyParser());
};

module.exports.auth = () => auth;
module.exports.auth.bearer = () => bearer;
