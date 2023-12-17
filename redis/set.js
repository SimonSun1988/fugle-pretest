const appRoot = require('app-root-path');
const _ = require('lodash');

const client = require(`${appRoot}/redis/client`);

module.exports = async (key, rawValue, ttl) => {
  try {
    const value = _.isObjectLike(rawValue) === true ? JSON.stringify(rawValue) : rawValue;

    await client.set(key, value);

    if (ttl) {
      await client.expire(key, ttl);
    }

    return rawValue;
  } catch (err) {
    throw new Error(err);
  }
};