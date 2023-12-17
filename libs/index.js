const appRoot = require('app-root-path');
module.exports = {
  parseStringObject: require(`${appRoot}/libs/parseStringObject`),
  ohlc: require(`${appRoot}/libs/ohlc`),
}