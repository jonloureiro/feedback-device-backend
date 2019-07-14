const Router = require('koa-router');

const { register, connect, data } = require('./mcu.service');
const { auth } = require('../../middlewares');


const prefix = '/mcu';
const router = new Router({ prefix });

router
  .use('/register', auth)
  .post('/register', async (ctx) => {
    await register(ctx.request.body, ctx.token);
    ctx.status = 201;
  })
  .post('/connect', async (ctx) => {
    ctx.body = await connect(ctx.request.body);
  })
  .use('/', auth)
  .post('/', async (ctx) => {
    ctx.body = await data(ctx.request.body);
    ctx.status = 201;
  });


module.exports = router.routes();
