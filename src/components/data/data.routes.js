const Router = require('koa-router');

const { save } = require('./data.service');
const { auth } = require('../../middlewares');


const prefix = '/data';
const router = new Router({ prefix });

router
  .use('/mcu', auth.bearer())
  .post('/mcu', async (ctx) => {
    await save(ctx.request.body, ctx.token);
    ctx.status = 201;
  });


module.exports = router.routes();
