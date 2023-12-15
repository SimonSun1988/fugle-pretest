module.exports = async (ctx) => {
  try {
    ctx.websocket.on('message', (message) => {
      ctx.websocket.send(`Echo: ${message}`);
    });

    ctx.websocket.on('close', () => {
      console.log('WebSocket connection closed');
    });
  } catch (err) {
    ctx.websocket.send(`error`);
  }
}