const Router = require('koa-router');

const { register, connect } = require('./mcu.service');
const { auth } = require('../../middlewares');


const prefix = '/mcu';
const router = new Router({ prefix });

router
  .use('/register', auth())
  .post('/register', async (ctx) => {
    await register(ctx.request.body, ctx.token);
    ctx.status = 201;
  })
  .post('/connect', async (ctx) => {
    ctx.body = { token: await connect(ctx.request.body) };
  });


module.exports = router.routes();
