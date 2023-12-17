const appRoot = require('app-root-path');

const redis = require(`${appRoot}/redis`);

module.exports = async (ctx) => {
  try {
    ctx.websocket.on('message', async (message) => {
      if (message.toString('utf8') === 'subscribe:btcusd') {
        redis.sub.subscribe('channel-btcusd-trades');
      }
      if (message.toString('utf8') === 'unsubscribe:btcusd') {
        redis.sub.unsubscribe('channel-btcusd-trades');
      }

      if (message.toString('utf8') === 'subscribe:ethusd') {
        redis.sub.subscribe('channel-ethusd-trades');
      }
      if (message.toString('utf8') === 'unsubscribe:ethusd') {
        redis.sub.unsubscribe('channel-ethusd-trades');
      }

      if (message.toString('utf8') === 'subscribe:usdtusd') {
        redis.sub.subscribe('channel-usdtusd-trades');
      }
      if (message.toString('utf8') === 'unsubscribe:usdtusd') {
        redis.sub.unsubscribe('channel-usdtusd-trades');
      }

      if (message.toString('utf8') === 'subscribe:xrpusd') {
        redis.sub.subscribe('channel-xrpusd-trades');
      }
      if (message.toString('utf8') === 'unsubscribe:xrpusd') {
        redis.sub.unsubscribe('channel-xrpusd-trades');
      }

      if (message.toString('utf8') === 'subscribe:solusd') {
        redis.sub.subscribe('channel-solusd-trades');
      }
      if (message.toString('utf8') === 'unsubscribe:solusd') {
        redis.sub.unsubscribe('channel-solusd-trades');
      }

      if (message.toString('utf8') === 'subscribe:usdcusd') {
        redis.sub.subscribe('channel-usdcusd-trades');
      }
      if (message.toString('utf8') === 'unsubscribe:usdcusd') {
        redis.sub.unsubscribe('channel-usdcusd-trades');
      }

      if (message.toString('utf8') === 'subscribe:adausd') {
        redis.sub.subscribe('channel-adausd-trades');
      }
      if (message.toString('utf8') === 'unsubscribe:adausd') {
        redis.sub.unsubscribe('channel-adausd-trades');
      }

      if (message.toString('utf8') === 'subscribe:avaxusd') {
        redis.sub.subscribe('channel-avaxusd-trades');
      }
      if (message.toString('utf8') === 'unsubscribe:avaxusd') {
        redis.sub.unsubscribe('channel-avaxusd-trades');
      }

      if (message.toString('utf8') === 'subscribe:dogeusd') {
        redis.sub.subscribe('channel-dogeusd-trades');
      }
      if (message.toString('utf8') === 'unsubscribe:dogeusd') {
        redis.sub.unsubscribe('channel-dogeusd-trades');
      }

      if (message.toString('utf8') === 'subscribe:dotusd') {
        redis.sub.subscribe('channel-dotusd-trades');
      }
      if (message.toString('utf8') === 'unsubscribe:dotusd') {
        redis.sub.unsubscribe('channel-dotusd-trades');
      }
    });

    redis.sub.on('message', (channel, message) => {
      try {
        ctx.websocket.send(message);
      } catch (err) {
        console.error(err);
      }
    });

    ctx.websocket.on('close', () => {
      console.log('WebSocket connection closed');
    });
  } catch (err) {
    ctx.websocket.send(`error`);
  }
}