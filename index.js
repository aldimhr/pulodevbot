import dotenv from 'dotenv';
dotenv.config();

import { Telegraf } from 'telegraf';

import errorHandler from './utils/errorHandler.mjs';

import startAction from './actions/start.mjs';
import middlewareAction from './actions/middleware.mjs';
import { latest, unfollow, follow } from './actions/commands.mjs';

const latestAction = latest;
const unfollowAction = unfollow;
const followAction = follow;

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(async (ctx, next) => await middlewareAction(ctx, next));
bot.start((ctx) => startAction(ctx));
bot.command(['follow', 'pulo_follow'], (ctx) => followAction(ctx));
bot.command(['unfollow', 'pulo_unfollow'], (ctx) => unfollowAction(ctx));
bot.command('latest', async (ctx) => await latestAction(ctx));
bot.catch((err, ctx) => {
  return errorHandler({ err, ctx, name: 'index.js/bot.catch()' });
});

bot.launch();

// addEventListener('fetch', (event) => {
//   event.respondWith(handleRequest(event.request));
// });

// async function handleRequest(request) {
//   // return new Response("Hello world")
//   console.log({ request });
//   // try {
//   //   if (event.body) {
//   //     await bot.handleUpdate(JSON.parse(event.body));
//   //     return { statusCode: 200, body: '' };
//   //   } else {
//   //     return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
//   //   }
//   // } catch (e) {
//   //   console.error('error in handler:', e);
//   //   return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
//   // }
// }
