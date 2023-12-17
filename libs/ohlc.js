const appRoot = require('app-root-path');
const axios = require('axios');
// const moment = require('moment');

const redis = require(`${appRoot}/redis`);

module.exports = async (symbol) => {
  try {
    const { data: { data: { ohlc: [ first ] }} } = await axios.get(`https://www.bitstamp.net/api/v2/ohlc/${symbol}?step=60&limit=1`)
    .catch((err) => {
      console.log(err);
    });

    const ohlc = await redis.set(`OHLC-${symbol}-${first.timestamp}`, first, 900)
    return ohlc;
  } catch (err) {
    console.log(err);
  }
};