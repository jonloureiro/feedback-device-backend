const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const { port } = require('./config');
const { error } = require('./middlewares');


const app = new Koa();

app
  .use(error)
  .use(bodyParser())
  .listen(port);


require('./components')(app);
