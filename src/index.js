const Koa = require('koa');

const { port } = require('./config');


const app = new Koa();

app.listen(port);


require('./middlewares')(app);
require('./components')(app);
