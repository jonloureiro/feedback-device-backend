const jwt = require('jsonwebtoken');

const Mcu = require('./mcu.model');
const { checkUser } = require('../user/user.service');
const { error } = require('../../lib');
const { secret } = require('../../config');


const token = mcu => ({
  token: jwt.sign({ id: mcu.name }, secret, {}),
});

const checkMcu = async (name) => {
  if (await Mcu.findOne({ name })) return true;
  return false;
};

const register = async ({ name }, email) => {
  if (await checkMcu(name)) throw error(400, 'MCU já cadastrado');
  if (!await checkUser(email)) throw error(401, 'Usuário não autorizado');
  const mcu = await Mcu.create({ name, user: email });
  if (!mcu) throw error(400, 'Erro ao cadastrar MCU');
};

const connect = async ({ name }) => {
  const mcu = await Mcu.findOne({ name });
  if (!mcu) throw error(400, 'MCU não cadastrado');
  return token(mcu);
};

const data = body => body;


module.exports = {
  register,
  connect,
  data,
};
