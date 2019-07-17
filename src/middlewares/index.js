const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const error = require('./error');
const auth = require('./auth');
const { bearer } = require('./auth');


module.exports = (app) => {
  app.use(error);
  app.use(bodyParser());
  app.use(cors());
};

module.exports.auth = () => auth;
module.exports.auth.bearer = () => bearer;
