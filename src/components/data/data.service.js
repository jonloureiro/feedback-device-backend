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
    // getMonth está devolvendo -1, logo janeiro está com 0;
    // buscar os dados de um mês atrás, logo não precisad e colocar -1
    const year = (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear();
    const month = (date.getMonth() === 0) ? 12 : date.getMonth();
    const today = date.getDate();

    const data = await Data.find({
      createAt: {
        $gte: new Date(`${year},${month},${today}`).toISOString(),
      },
    });

    const response = data.reduce((acc, cur) => {
      const objDate = new Date(cur.createAt);
      const objMonth = objDate.getMonth();
      const objDay = objDate.getDate();
      let attr = '';

      // hoje: 23 de julho
      // semana: 17 de julho até 22 de julho (hoje não incluso)
      // mês: 23 de junho até 16 de julho (semana não inclusa)
      // TODO: arrumar semana em que parte está em um mês e parte no outro mês
      if (objMonth !== month) attr = 'month';
      else if (objDay === today) attr = 'today';
      else if (objDay > today - 7) attr = 'week';
      else attr = 'month';

      acc[attr][cur.value] += 1;

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
