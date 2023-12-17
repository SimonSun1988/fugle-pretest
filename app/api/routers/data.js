const axios = require('axios');
const _ = require('lodash');

module.exports = async (ctx, next) => {
  try {
    const { user: id } = ctx.query;

    if (_.isInteger(parseFloat(id)) === false) {
      throw new Error('1003');
    }

    if (parseFloat(id) < 1 || parseFloat(id) > 1000) {
      throw new Error('1003');
    }

    const { data: numberList } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .catch((err) => {
      throw new Error('1001');
    });

    const divisibleList = _.filter(numberList, (number) => {
      return (number%parseInt(id) === 0);
    });

    ctx.body = {
      result: divisibleList
    };
  } catch (err) {
    return ctx.throw(err);
  }
}