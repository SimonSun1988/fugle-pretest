const Redis = require("ioredis");
const redis = new Redis({
  port: 6379,
  host: 'localhost',
  db: 0
});
module.exports = redis;