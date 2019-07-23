/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
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
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let i;
  for (i = 0; i < 5; i += 1) {
    const createAt = new Date(`${year},${month},${day}`).toISOString();
    const data = { value: i % 3, createAt };
    axios.post(`${url}/data/mcu`, data, config)
      .then(() => console.log(createAt))
      .catch(err => console.log(err));
  }

  for (i = 1; i < 7; i += 1) {
    const createAt = new Date(`${year},${month},${day - i}`).toISOString();
    const data = { value: i % 3, createAt };
    axios.post(`${url}/data/mcu`, data, config)
      .then(() => console.log(createAt))
      .catch(err => console.log(err));
  }

  for (i = 8; i < 12; i += 1) {
    const createAt = new Date(`${year},${month},${day - i}`).toISOString();
    const data = { value: i % 3, createAt };
    axios.post(`${url}/data/mcu`, data, config)
      .then(() => console.log(createAt))
      .catch(err => console.log(err));
  }

  for (i = 0; i < 4; i += 1) {
    const createAt = new Date(`${year},${month - 1},${day}`).toISOString();
    const data = { value: i % 3, createAt };
    axios.post(`${url}/data/mcu`, data, config)
      .then(() => console.log(createAt))
      .catch(err => console.log(err));
  }
});
