const appRoot = require('app-root-path');

module.exports = {
  client: require(`${appRoot}/redis/client`),
  set: require(`${appRoot}/redis/set`),
  get: require(`${appRoot}/redis/get`),
  pub: require(`${appRoot}/redis/pub`),
  sub: require(`${appRoot}/redis/sub`),
}