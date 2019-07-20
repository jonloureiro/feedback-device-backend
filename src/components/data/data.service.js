const Data = require('./data.model');
const { checkMcu } = require('../mcu');
const { checkUser } = require('../user');
const { error } = require('../../lib');


const save = async (body, mcu) => {
  if (!await checkMcu(mcu)) throw error(401, 'MCU não autorizado');
  try {
    await Data.create(body);
  } catch (err) {
    throw error(400, 'Erro ao registrar dados');
  }
};

const take = async (user) => {
  if (!await checkUser(user)) throw error(401, 'Usuário não autorizado');
  return { message: 'EM CONSTRUÇÃO' };
};


module.exports = {
  save,
  take,
};
