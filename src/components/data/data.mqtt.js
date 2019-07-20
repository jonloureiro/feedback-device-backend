const { connect } = require('mqtt');

const { mqtt: { topic, broker_url: url, options } } = require('../../config');

module.exports = () => {
  let client = connect(url, options);

  client.on('connect', () => {
    client.subscribe(topic, (err) => {
      if (err) console.log(err);
    });
  });

  client.on('message', (channel, message) => {
    if (channel === topic) console.log(message.toString());
  });

  client.on('reconnect', () => {
    client = connect(url, options);
  });
};
