const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const { port } = require('./config');


const app = new Koa();

app
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = {
        message: err.message,
      };
      if (ctx.status === 500) ctx.app.emit('error', err, ctx);
    }
  })
  .use(bodyParser())
  .listen(port);


require('./components')(app);
