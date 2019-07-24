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

  axios.post(`${url}/data/mcu`,
    {
      value: 0,
      createAt: new Date(`${year},${month},${day}`).toISOString(),
    },
    config)
    .then(() => console.log(new Date(`${year},${month},${day}`).toISOString()))
    .catch(err => console.log(err));


  axios.post(`${url}/data/mcu`,
    {
      value: 1,
      createAt: new Date(`${year},${month},${day - 1}`).toISOString(),
    },
    config)
    .then(() => console.log(new Date(`${year},${month},${day - 1}`).toISOString()))
    .catch(err => console.log(err));

  axios.post(`${url}/data/mcu`,
    {
      value: 2,
      createAt: new Date(`${year},${month},${day - 6}`).toISOString(),
    },
    config)
    .then(() => console.log(new Date(`${year},${month},${day - 6}`).toISOString()))
    .catch(err => console.log(err));

  axios.post(`${url}/data/mcu`,
    {
      value: 0,
      createAt: new Date(`${year},${month},${day - 7}`).toISOString(),
    },
    config)
    .then(() => console.log(new Date(`${year},${month},${day - 7}`).toISOString()))
    .catch(err => console.log(err));

  axios.post(`${url}/data/mcu`,
    {
      value: 1,
      createAt: new Date(`${year},${month},${day - 8}`).toISOString(),
    },
    config)
    .then(() => console.log(new Date(`${year},${month},${day - 8}`).toISOString()))
    .catch(err => console.log(err));

  axios.post(`${url}/data/mcu`,
    {
      value: 2,
      createAt: new Date(`${year},${month - 1},${day}`).toISOString(),
    },
    config)
    .then(() => console.log(new Date(`${year},${month - 1},${day}`).toISOString()))
    .catch(err => console.log(err));

  axios.post(`${url}/data/mcu`,
    {
      value: 2,
      createAt: new Date(`${year},${month - 1},${day - 1}`).toISOString(),
    },
    config)
    .then(() => console.log(new Date(`${year},${month - 1},${day - 1}`).toISOString()))
    .catch(err => console.log(err));
});
