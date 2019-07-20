const { connect } = require('mqtt');

const { save } = require('./data.service');
const { mqtt: { topic, broker_url: url, options } } = require('../../config');


module.exports = () => {
  let client = connect(url, options);
  let myMessage = '';

  client.on('connect', () => {
    client.subscribe(topic, (err) => {
      if (err) console.log(`TRATAR O ERRO CORRETAMENTE \n${err}`);
    });
  });

  client.on('message', async (channel, payload) => {
    const message = payload.toString();
    if (myMessage !== message && channel === topic) {
      const [value, mcu] = message.split(' ');
      const body = { value, mcu };
      try {
        await save(body, mcu);
        myMessage = '201 Created';
      } catch (err) {
        myMessage = `${err.status} ${err.message}`;
      } finally {
        client.publish(channel, myMessage);
      }
    }
  });

  client.on('error', (err) => {
    console.log(`TRATAR O ERRO CORRETAMENTE \n${err}`);
  });

  client.on('reconnect', () => {
    client = connect(url, options);
  });
};
