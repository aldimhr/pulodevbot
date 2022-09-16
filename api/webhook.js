require('dotenv').config();
const { Telegraf } = require('telegraf');

const errorHandler = require('../utils/errorHandler.js');

const startAction = require('../actions/start.js');
const middlewareAction = require('../actions/middleware.js');
const { latest, unfollow, follow } = require('../actions/commands.js');

const latestAction = latest;
const unfollowAction = unfollow;
const followAction = follow;

/*
  "build": "esbuild index.js --bundle --outdir=dist --platform=node",
  "start": "node index.js",
  "dev": "nodemon index.js",
*/

module.exports = async (req, res) => {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  const { body } = req;

  if (body?.message) {
    bot.use(async (ctx, next) => await middlewareAction(ctx, next));
    bot.start((ctx) => startAction(ctx));
    bot.command(['follow', 'pulo_follow'], (ctx) => followAction(ctx));
    bot.command(['unfollow', 'pulo_unfollow'], (ctx) => unfollowAction(ctx));
    bot.command('latest', async (ctx) => await latestAction(ctx));
    bot.catch((err, ctx) => {
      return errorHandler({ err, ctx, name: 'index.js/bot.catch()' });
    });

    await bot.handleUpdate(body);
  }

  res.status(400).send('This endpoint is meant for bot and telegram communication');
};