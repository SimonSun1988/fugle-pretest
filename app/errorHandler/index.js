const appRoot = require('app-root-path');

const errorFormat = require(`${appRoot}/app/errorHandler/errorFormat`);

const PrettyError = require('pretty-error');
const prettyError = new PrettyError();
prettyError.withoutColors();
prettyError.skipPackage(
  'koa-compose',
  'koa-router',
  'koa2-cors',
  'koa-body',
  'koa-logger',
  'jsonwebtoken',
  'bluebird'
);

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const customError = errorFormat[err.message] || sequelizeValidationError || errorFormat['1000'];
      const errorResponse = {};
      errorResponse.code = customError.code;
      errorResponse.status = customError.status;
      errorResponse.message = customError.message;

      if (customError.code >= 1000) {
        console.log(`---------- ERROR ----------`);
        console.log(`code: ${errorResponse.code}`);
        console.log(`message: ${errorResponse.message}`);
        console.log(`status: ${errorResponse.status}`);
        console.log(`stack:`);
        console.log(prettyError.render(err));
        console.log(`---------- ERROR ----------`);
      }

      ctx.status = errorResponse.status;
      ctx.body = errorResponse;
    }
  };
};