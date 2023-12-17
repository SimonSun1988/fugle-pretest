const appRoot = require('app-root-path');
const ws = require('ws');

const redis = require(`${appRoot}/redis`);

module.exports = (app) => {
  const wsClient = new ws('wss://ws.bitstamp.net');

  wsClient.on('open', function open() {
    console.log('Connected to ws.bitstamp.net');
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

  wsClient.on('message', (data) => {
    try {
      const { channel: bitstampChannel } = JSON.parse(data);
      console.log(`bitstampChannel = ${bitstampChannel}`);

      if (bitstampChannel === 'live_trades_btcusd') {
        redis.pub.publish('channel-btcusd-trades', data);
      }

      if (bitstampChannel === 'live_trades_ethusd') {
        redis.pub.publish('channel-ethusd-trades', data);
      }

      if (bitstampChannel === 'live_trades_usdtusd') {
        redis.pub.publish('channel-usdtusd-trades', data);
      }

      if (bitstampChannel === 'live_trades_xrpusd') {
        redis.pub.publish('channel-xrpusd-trades', data);
      }

      if (bitstampChannel === 'live_trades_solusd') {
        redis.pub.publish('channel-solusd-trades', data);
      }

      if (bitstampChannel === 'live_trades_usdcusd') {
        redis.pub.publish('channel-usdcusd-trades', data);
      }

      if (bitstampChannel === 'live_trades_adausd') {
        redis.pub.publish('channel-adausd-trades', data);
      }

      if (bitstampChannel === 'live_trades_avaxusd') {
        redis.pub.publish('channel-avaxusd-trades', data);
      }

      if (bitstampChannel === 'live_trades_dogeusd') {
        redis.pub.publish('channel-dogeusd-trades', data);
      }

      if (bitstampChannel === 'live_trades_dotusd') {
        redis.pub.publish('channel-dotusd-trades', data);
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