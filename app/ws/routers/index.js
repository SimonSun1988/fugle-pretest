const appRoot = require('app-root-path');
const Router = require('koa-router');
const router = new Router({
    prefix: ''
});

router.all('/stream', require(`${appRoot}/app/ws/routers/stream`));

module.exports = (app) => {
  app.ws.use(router.routes())
  app.use(router.allowedMethods());

  return async (ctx, next) => {
    try {
      return next();
    } catch (err) {
        return next(err);
    }
  };
};