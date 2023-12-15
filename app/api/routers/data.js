module.exports = async (ctx, next) => {
  try {
    ctx.body = 'data';
  } catch (err) {
    return ctx.throw(err);
  }
}