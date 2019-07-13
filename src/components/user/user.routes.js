const Router = require('koa-router');

const { register, login } = require('./user.service');


const prefix = '/auth';
const router = new Router({ prefix });

router
  .post('/register', async (ctx) => {
    ctx.body = await register(ctx.request.body);
  })
  .post('/login', async (ctx) => {
    ctx.body = await login(ctx.request.body);
  });


module.exports = router.routes();
