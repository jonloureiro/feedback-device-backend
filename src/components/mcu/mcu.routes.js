const Router = require('koa-router');

const {
  register, connect, auth, data,
} = require('./mcu.service');


const prefix = '/mcu';
const router = new Router({ prefix });

router
  .post('/register', async (ctx) => {
    ctx.body = await register(ctx.request.body);
  })
  .post('/connect', async (ctx) => {
    ctx.body = await connect(ctx.request.body);
  })
  .use('/', auth)
  .post('/', async (ctx) => {
    ctx.body = await data(ctx.request.body);
  });


module.exports = router.routes();
