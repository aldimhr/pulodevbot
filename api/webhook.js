require('dotenv').config();
const { Telegraf } = require('telegraf');

const errorHandler = require('../utils/errorHandler.js');

const startAction = require('../actions/start.js');
const middlewareAction = require('../actions/middleware.js');
const { latest, unfollow, follow } = require('../actions/commands.js');

const latestAction = latest;
const unfollowAction = unfollow;
const followAction = follow;

module.exports = async (req, res) => {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  const { body } = req;

  if (body?.message) {
    bot.use(async (ctx, next) => await middlewareAction(ctx, next));
    bot.start((ctx) => startAction(ctx));
    bot.command(['follow', 'pulo_follow'], async (ctx) => await followAction(ctx));
    bot.command(['unfollow', 'pulo_unfollow'], async (ctx) => await unfollowAction(ctx));
    bot.command('latest', async (ctx) => await latestAction(ctx));
    bot.catch((err, ctx) => {
      return errorHandler({ err, ctx, name: 'index.js/bot.catch()' });
    });

    await bot.handleUpdate(body);
    return res.send();
  }

  return res.status(400).send('This endpoint is meant for bot and telegram communication');
};
