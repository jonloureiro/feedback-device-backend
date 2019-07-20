module.exports = {
  port: process.env.PORT || 3030,
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/museu',
  saltRounds: process.env.SALT_ROUNDS || 10,
  secret: process.env.SECRET || 'secret',
  expiresIn: process.env.EXPIRES_IN || 604800,
  keys: process.env.KEYS || ['some secret hurr'],
  credentials: process.env.CREDENTIALS || true,
  mqtt: {
    broker_url: process.env.BROKER_URL || 'mqtt://localhost',
    topic: process.env.TOPIC || 'feedback',
    options: {
      clientId: process.env.CLIENT_ID || 'MyMQTT',
      port: process.env.MQTT_PORT || 1883,
      username: process.env.MQTT_USER || 'nodejs',
      password: process.env.MQTT_PASS || '123456',
      keepalive: process.env.KEEP_ALIVE || 60,
    },
  },
};
