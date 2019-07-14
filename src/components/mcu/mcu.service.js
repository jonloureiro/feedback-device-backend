/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

const Mcu = require('./mcu.model');
const { error, formattedToken } = require('../../lib');
const { secret } = require('../../config');


const token = mcu => ({
  token: jwt.sign({ id: mcu.name }, secret, {}),
});

const register = async ({ name }) => {
  if (await Mcu.findOne({ name })) throw error(400, 'MCU já cadastrado');
  const mcu = await Mcu.create({ name });
  if (!mcu) throw error(400, 'Erro ao cadastrar MCU');
  return token(mcu);
};

const connect = async ({ name }) => {
  const mcu = await Mcu.findOne({ name });
  if (!mcu) throw error(400, 'MCU não cadastrado');
  return token(mcu);
};

const auth = async (ctx, next) => {
  const validToken = formattedToken(ctx.header);
  if (!validToken) throw error(401, 'Token error');
  try {
    const decoded = jwt.verify(validToken, secret);
    ctx.id = decoded.id;
    next();
  } catch (err) {
    throw error(401, 'Token inválida');
  }
};

const data = body => body;

module.exports = {
  register,
  connect,
  auth,
  data,
};
