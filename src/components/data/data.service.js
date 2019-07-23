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
    // buscar os dados de um mês
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

      // console.log(`${objDay} > ${today - 7}`);

      if (!objMonth === month) attr = 'month';
      else if (objDay === today) attr = 'today';
      else if (objDay > today - 7) attr = 'week';
      else attr = 'month';

      switch (cur.value) {
        case 0:
          acc[attr][0] += 1;
          break;
        case 1:
          acc[attr][1] += 1;
          break;
        case 2:
          acc[attr][2] += 1;
          break;
        default:
          break;
      }

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
