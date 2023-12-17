const appRoot = require('app-root-path');
const moment = require('moment');

const redis = require(`${appRoot}/redis`);

module.exports = () => async (ctx, next) => {
  try {
    const expired = moment().add(60, 'seconds').unix();

    let [ ipLog, userLog ] = await Promise.all([
      redis.get(`rateLimit-${ctx.state.clientIp}`),
      redis.get(`rateLimit-${ctx.query.user}`)
    ]);

    if (!ipLog) {
      ipLog = await redis.set(`rateLimit-${ctx.state.clientIp}`, {
        count: 0,
        ip: ctx.state.clientIp,
        expired
      }, 60);
    }

    if (!userLog) {
      userLog = await redis.set(`rateLimit-${ctx.query.user}`, {
        count: 0,
        ip: ctx.state.clientIp,
        expired
      }, 60);
    }

    if (ipLog.count >= 10) {
      const errorMessage = JSON.stringify({
        status: 429,
        response: {
          ip: ipLog.count,
          id: userLog.count
        }
      });
      throw new Error(errorMessage);
    }

    if (userLog.count >= 5) {
      const errorMessage = JSON.stringify({
        status: 429,
        response: {
          ip: ipLog.count,
          id: userLog.count
        }
      });
      throw new Error(errorMessage);
    }

    const now = moment().unix();

    await redis.set(`rateLimit-${ctx.state.clientIp}`, {
      count: ipLog.count + 1,
      ip: ctx.state.clientIp,
      user: ctx.query.user,
      expired: ipLog.expired
    }, ipLog.expired - now);

    await redis.set(`rateLimit-${ctx.query.user}`, {
      count: userLog.count + 1,
      ip: ctx.state.clientIp,
      user: ctx.query.user,
      expired: userLog.expired
    }, userLog.expired - now);

    return await next();
  } catch (err) {
    ctx.throw(err);
  }
};