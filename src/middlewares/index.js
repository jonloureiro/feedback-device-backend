const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const error = require('./error');
const auth = require('./auth');
const { bearer } = require('./auth');
const { credentials } = require('../config');


module.exports = (app) => {
  app.use(error);
  app.use(bodyParser());
  app.use(cors({ credentials }));
};

module.exports.auth = () => auth;
module.exports.auth.bearer = () => bearer;
