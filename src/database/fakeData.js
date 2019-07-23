const axios = require('axios');
const { port } = require('../config');


const url = `http://localhost:${port}`;

const getToken = (callback) => {
  axios.post(`${url}/mcu/connect`, {
    name: 'esp32',
  })
    .then(callback)
    .catch(err => console.log(err));
};

getToken(({ data: token }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  for (let i = 0; i < 15; i += 1) {
    if (i > 2 && i < 10) {
      if (day > 0) day -= 1;
      else { day = 30; month -= 1; }
    } else if (i === 10) month -= 1;
    const createAt = new Date(`${year},${month},${day}`);
    const data = { value: i % 3, createAt };
    axios.post(`${url}/data/mcu`, data, config)
      .then(() => console.log(createAt))
      .catch(err => console.log(err));
  }
});
