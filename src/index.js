const Koa = require('koa');
const { port } = require('./config');

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Iniciando museu-backend';
});

app.listen(port);
