const Data = require('./data.model');
const { checkMcu } = require('../mcu');
const { checkUser } = require('../user');
const { error } = require('../../lib');
const { node_env: env } = require('../../config');


const save = async ({ value, createAt }, mcu) => {
  if (!await checkMcu(mcu)) throw error(401, 'MCU não autorizado');
  try {
    if (env === 'development') {
      await Data.create({ value, mcu, createAt });
    } else {
      await Data.create({ value, mcu });
    }
  } catch (err) {
    throw error(400, 'Erro ao registrar dados');
  }
};

const take = async (user) => {
  if (!await checkUser(user)) throw error(401, 'Usuário não autorizado');
  try {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const timestamp = date.getTime();

    // TODO: Removendo 30 dias. Verificar qual é o mês e remover o valor correto
    const data = await Data.find({
      createAt: {
        $gte: new Date(timestamp - (86400000 * 30)),
      },
    });

    const response = data.reduce((acc, cur) => {
      const objDate = new Date(cur.createAt);
      const objTimestamp = objDate.getTime();

      if (objTimestamp >= timestamp) {
        acc.today[cur.value] += 1;
      }
      if (objTimestamp >= (timestamp - (86400000 * 7))) {
        acc.week[cur.value] += 1;
      }
      acc.month[cur.value] += 1;

      return acc;
    }, {
      today: [0, 0, 0],
      week: [0, 0, 0],
      month: [0, 0, 0],
    });

    return response;
  } catch (err) {
    throw error(400, 'Erro ao consultar dados');
  }
};


module.exports = {
  save,
  take,
};
