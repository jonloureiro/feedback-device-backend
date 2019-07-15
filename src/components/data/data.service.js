const Data = require('./data.model');
const { checkMcu } = require('../mcu/mcu.service');
const { error } = require('../../lib');


const save = async (body, mcu) => {
  if (!await checkMcu(mcu)) throw error(401, 'MCU não autorizado');
  const data = await Data.create(body);
  if (!data) throw error(400, 'Erro ao registrar dados');
};


module.exports = {
  save,
};
