const url = require('url');

const mqttURL = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://raoni:123456@localhost:1883');
const mqttAUTH = (mqttURL.auth || ':').split(':');

module.exports = {
  port: process.env.PORT || 3030,
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/museu',
  saltRounds: process.env.SALT_ROUNDS || 10,
  secret: process.env.SECRET || 'secret',
  expiresIn: process.env.EXPIRES_IN || 604800,
  keys: process.env.KEYS || ['some secret hurr'],
  credentials: process.env.CREDENTIALS || true,
  mqtt: {
    broker_url: mqttURL.hostname,
    topic: process.env.TOPIC || 'feedback',
    options: {
      port: mqttURL.port,
      username: mqttAUTH[0],
      password: mqttAUTH[1],
    },
  },
};
