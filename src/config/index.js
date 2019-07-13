module.exports = {
  port: process.env.PORT || 3030,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/museu',
  },
  saltRounds: process.env.SALT_ROUNDS || 10,
  secret: process.env.SECRET || 'secret',
};