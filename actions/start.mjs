import { message, commands } from '../config/constans.mjs';
import errorHandler from '../utils/errorHandler.mjs';

export default (ctx) => {
  try {
    ctx.reply(message.welcome);
    ctx.telegram.setMyCommands(commands, { type: 'chat', chat_id: ctx.chat.id });
  } catch (err) {
    errorHandler({ err, ctx, name: 'index.js/bot.start()' });
  }
};
