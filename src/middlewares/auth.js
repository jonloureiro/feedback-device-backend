const jwt = require('jsonwebtoken');

const { error, formattedToken } = require('../lib');
const { secret } = require('../config');


module.exports = async (ctx, next) => {
  const validToken = formattedToken(ctx.header);
  if (!validToken) throw error(401, 'Token error');
  try {
    const decoded = jwt.verify(validToken, secret);
    ctx.token = decoded.id;
    next();
  } catch (err) {
    throw error(401, 'Token inválida');
  }
};
