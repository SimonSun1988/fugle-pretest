const appRoot = require('app-root-path');

const libs = require(`${appRoot}/libs`);
const client = require(`${appRoot}/redis/client`);

module.exports = async (key) => {
  try {
    const value = await client.get(key);

    if (!value) {
      return null;
    }

    return await libs.parseStringObject(value);
  } catch (err) {
    throw new Error(err);
  }
};