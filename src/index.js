const Koa = require('koa');

const { port, keys } = require('./config');


const app = new Koa();
app.keys = keys;
app.listen(port);


require('./middlewares')(app);
require('./components')(app);
