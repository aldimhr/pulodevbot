require('dotenv').config();
const { Telegraf } = require('telegraf');

const errorHandler = require('./utils/errorHandler.js');

const startAction = require('./actions/start.js');
const middlewareAction = require('./actions/middleware.js');
const { latest, unfollow, follow } = require('./actions/commands.js');

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

// import http from 'http';
// http
//   .createServer(async function (req, res) {
//     console.log({ req });

//     await bot.handleUpdate(JSON.parse(req.body));
//     console.log(`Just got a request at ${req.url}!`);
//     res.write('Yo!');
//     res.end();
//   })
//   .listen(process.env.PORT || 3000);

// addEventListener('fetch', (event) => {
//   event.respondWith(handleRequest(event.request));
// });

// async function handleRequest(request) {
//   return new Response('Hello world');
//   console.log({ request });
//   try {
//     if (event.body) {
//       await bot.handleUpdate(JSON.parse(event.body));
//       return { statusCode: 200, body: '' };
//     } else {
//       return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
//     }
//   } catch (e) {
//     console.error('error in handler:', e);
//     return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
//   }
// }
