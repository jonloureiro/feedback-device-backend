const url = require('url');


const {
  protocol, hostname, auth, port,
} = url.parse(process.env.MQTT_URL || 'mqtt://raoni:123456@localhost:1883');
const [username, password] = (auth || ':').split(':');


module.exports = {
  port: process.env.PORT || 3030,
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/museu',
  saltRounds: process.env.SALT_ROUNDS || 10,
  secret: process.env.SECRET || 'secret',
  expiresIn: process.env.EXPIRES_IN || 604800,
  keys: process.env.KEYS || ['some secret hurr'],
  credentials: process.env.CREDENTIALS || true,
  mqtt: {
    url: `${protocol}${hostname}`,
    topic: process.env.TOPIC || 'feedback',
    options: {
      clientId: process.env.CLIENT_ID || 'Nodejs',
      port,
      username,
      password,
      keepalive: process.env.KEEP_ALIVE || 60,
    },
  },
};
