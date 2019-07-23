const jwt = require('jsonwebtoken');

const { error, formattedToken } = require('../lib');
const { secret } = require('../config');


const verify = async (token, ctx, next) => {
  try {
    const decoded = jwt.verify(token, secret);
    ctx.token = decoded.id;
  } catch (err) {
    throw error(401, 'Token inválida');
  }
  await next();
};

module.exports = async (ctx, next) => {
  const token = ctx.cookies.get('token');
  await verify(token, ctx, next);
};

module.exports.bearer = async (ctx, next) => {
  const token = formattedToken(ctx.header);
  if (!token) throw error(401, 'Header não formatado');
  await verify(token, ctx, next);
};
