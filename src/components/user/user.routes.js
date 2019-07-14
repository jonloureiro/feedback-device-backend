const Router = require('koa-router');

const { register, login } = require('./user.service');


const prefix = '/user';
const router = new Router({ prefix });

router
  .post('/register', async (ctx) => {
    const token = await register(ctx.request.body);
    ctx.cookies.set('token', token);
    ctx.status = 201;
  })
  .post('/login', async (ctx) => {
    const token = await login(ctx.request.body);
    ctx.cookies.set('token', token);
    ctx.status = 200;
  });


module.exports = router.routes();
