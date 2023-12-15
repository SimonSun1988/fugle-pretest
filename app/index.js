const appRoot = require('app-root-path');
const koa = require('koa');
const websockify = require('koa-websocket');

const app = websockify(new koa());

const errorHandler = require(`${appRoot}/app/errorHandler`);
const api = require(`${appRoot}/app/api`);
const ws = require(`${appRoot}/app/ws`);

app.use(errorHandler());
app.use(api(app));
app.use(ws(app));

module.exports = app;
