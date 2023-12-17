const appRoot = require('app-root-path');
const koa = require('koa');
const websockify = require('koa-websocket');

const app = websockify(new koa());

const errorHandler = require(`${appRoot}/app/errorHandler`);
const middlewares = require(`${appRoot}/app/middlewares`);
const api = require(`${appRoot}/app/api`);
const ws = require(`${appRoot}/app/ws`);
const bitstamp = require(`${appRoot}/app/bitstamp`);

app.use(errorHandler());
app.use(middlewares(app));
app.use(api(app));
app.use(ws(app));
app.use(bitstamp(app));

module.exports = app;
