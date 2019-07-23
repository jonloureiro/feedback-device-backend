module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message,
    };
    if (ctx.status === 500) ctx.app.emit('error', err, ctx);
  }
};
