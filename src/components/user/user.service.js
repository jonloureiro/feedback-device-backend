const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./user.model');
const { error } = require('../../lib');
const { secret, expiresIn } = require('../../config');


const token = user => jwt.sign({ id: user.email }, secret, { expiresIn });

const checkUser = async (email) => {
  if (await User.findOne({ email })) return true;
  return false;
};

const register = async ({ email, password }) => {
  if (await checkUser(email)) throw error(400, 'E-mail já cadastrado');
  try {
    const user = await User.create({ email, password });
    return token(user);
  } catch (err) {
    throw error(400, 'Erro ao se cadastrar');
  }
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw error(400, 'E-mail não cadastrado');
  if (!await bcrypt.compare(password, user.password)) throw error(400, 'E-mail e/ou senha estão errados');
  return token(user);
};


module.exports = {
  checkUser,
  login,
  register,
};
