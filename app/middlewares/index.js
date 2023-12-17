const net = require('net');
const morgan = require('koa-morgan');
const address6 = require('ip-address').Address6;
const axios = require('axios');

module.exports = (app) => {

  app.use(morgan('dev'));

  app.use(async (ctx, next) => {
    const { data: { ip } } = await axios.get('https://api.ipify.org?format=json')
    .catch(err => {
      throw new Error('1002');
    });

    ctx.state.clientIp = ip;
    return next();
  });

  return async (ctx, next) => {
    try {
        return next();
    } catch (err) {
        return next(err);
    }
  };
};