const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./user.model');
const { error } = require('../../lib');
const { secret } = require('../../config');


const token = user => ({
  token: jwt.sign({ id: user.email }, secret, { expiresIn: 604800 }),
});

const checkUser = async (email) => {
  if (await User.findOne({ email })) return true;
  return false;
};

const register = async ({ email, password }) => {
  if (await checkUser(email)) throw error(400, 'E-mail já cadastrado');
  const user = await User.create({ email, password });
  if (!user) throw error(400, 'Erro ao se cadastrar');
  return token(user);
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw error(400, 'E-mail não cadastrado');
  if (!await bcrypt.compare(password, user.password)) throw error(400, 'E-mail e/ou senha estão errados');
  return token(user);
};


module.exports = { checkUser, login, register };
