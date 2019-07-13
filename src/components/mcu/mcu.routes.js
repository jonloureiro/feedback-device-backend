const Router = require('koa-router');

const { register, connect } = require('./mcu.service');


const prefix = '/mcu';
const router = new Router({ prefix });

router
  .post('/register', async (ctx) => {
    ctx.body = await register(ctx.request.body);
  })
  .post('/connect', async (ctx) => {
    ctx.body = await connect(ctx.request.body);
  });


module.exports = router.routes();
