const appRoot = require('app-root-path');
const ws = require('ws');

const redis = require(`${appRoot}/redis`);
const libs = require(`${appRoot}/libs`);

module.exports = (app) => {
  const wsClient = new ws('wss://ws.bitstamp.net');

  wsClient.on('open', function open() {
    wsClient.send(JSON.stringify({
      event: 'bts:subscribe',
      data: {
        channel: 'live_trades_btcusd'
      }
    }));
    wsClient.send(JSON.stringify({
      event: 'bts:subscribe',
      data: {
        channel: 'live_trades_ethusd'
      }
    }));
    wsClient.send(JSON.stringify({
      event: 'bts:subscribe',
      data: {
        channel: 'live_trades_usdtusd'
      }
    }));
    wsClient.send(JSON.stringify({
      event: 'bts:subscribe',
      data: {
        channel: 'live_trades_xrpusd'
      }
    }));
    wsClient.send(JSON.stringify({
      event: 'bts:subscribe',
      data: {
        channel: 'live_trades_solusd'
      }
    }));
    wsClient.send(JSON.stringify({
      event: 'bts:subscribe',
      data: {
        channel: 'live_trades_usdcusd'
      }
    }));
    wsClient.send(JSON.stringify({
      event: 'bts:subscribe',
      data: {
        channel: 'live_trades_adausd'
      }
    }));
    wsClient.send(JSON.stringify({
      event: 'bts:subscribe',
      data: {
        channel: 'live_trades_avaxusd'
      }
    }));
    wsClient.send(JSON.stringify({
      event: 'bts:subscribe',
      data: {
        channel: 'live_trades_dogeusd'
      }
    }));
    wsClient.send(JSON.stringify({
      event: 'bts:subscribe',
      data: {
        channel: 'live_trades_dotusd'
      }
    }));
  });

  wsClient.on('message', async (data) => {
    try {
      data = JSON.parse(data);
      const { channel: bitstampChannel } = data;

      if (bitstampChannel === 'live_trades_btcusd') {
        data.ohlc = await libs.ohlc('btcusd');
        redis.pub.publish('channel-btcusd-trades', JSON.stringify(data));
      }

      if (bitstampChannel === 'live_trades_ethusd') {
        data.ohlc = await libs.ohlc('ethusd');
        redis.pub.publish('channel-ethusd-trades', JSON.stringify(data));
      }

      if (bitstampChannel === 'live_trades_usdtusd') {
        data.ohlc = await libs.ohlc('usdtusd');
        redis.pub.publish('channel-usdtusd-trades', JSON.stringify(data));
      }

      if (bitstampChannel === 'live_trades_xrpusd') {
        data.ohlc = await libs.ohlc('xrpusd');
        redis.pub.publish('channel-xrpusd-trades', JSON.stringify(data));
      }

      if (bitstampChannel === 'live_trades_solusd') {
        data.ohlc = await libs.ohlc('solusd');
        redis.pub.publish('channel-solusd-trades', JSON.stringify(data));
      }

      if (bitstampChannel === 'live_trades_usdcusd') {
        data.ohlc = await libs.ohlc('usdcusd');
        redis.pub.publish('channel-usdcusd-trades', JSON.stringify(data));
      }

      if (bitstampChannel === 'live_trades_adausd') {
        data.ohlc = await libs.ohlc('adausd');
        redis.pub.publish('channel-adausd-trades', JSON.stringify(data));
      }

      if (bitstampChannel === 'live_trades_avaxusd') {
        data.ohlc = await libs.ohlc('avaxusd');
        redis.pub.publish('channel-avaxusd-trades', JSON.stringify(data));
      }

      if (bitstampChannel === 'live_trades_dogeusd') {
        data.ohlc = await libs.ohlc('dogeusd');
        redis.pub.publish('channel-dogeusd-trades', JSON.stringify(data));
      }

      if (bitstampChannel === 'live_trades_dotusd') {
        data.ohlc = await libs.ohlc('dotusd');
        redis.pub.publish('channel-dotusd-trades', JSON.stringify(data));
      }

    } catch (err) {
      console.error(err);
    }
  });

  wsClient.on('close', function close() {
    console.log('Disconnected from ws.bitstamp.net');
  });

  wsClient.on('error', function error(err) {
    console.error('WebSocket error:', err);
  });

  return async (ctx, next) => {
    try {
      return next();
    } catch (err) {
      return next(err);
    }
  };
};