const appRoot = require('app-root-path');

const routers = require(`${appRoot}/app/api/routers`);

module.exports = (app) => {

  app.use(routers(app));

  return async (ctx, next) => {
    try {
        return next();
    } catch (err) {
        return next(err);
    }
  };
};