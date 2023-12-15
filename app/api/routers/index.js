const appRoot = require('app-root-path');
const Router = require('koa-router');
const router = new Router({
  prefix: ''
});

router.get('/data', require(`${appRoot}/app/api/routers/data`));

module.exports = (app) => {
  app.use(router.routes());
  app.use(router.allowedMethods());

  return async (ctx, next) => {
    try {
      return next();
    } catch (err) {
      return next(err);
    }
  };
};