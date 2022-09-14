const { message, commands } = require('../config/constans.js');
const errorHandler = require('../utils/errorHandler.js');

module.exports = (ctx) => {
  try {
    ctx.reply(message.welcome);
    ctx.telegram.setMyCommands(commands, { type: 'chat', chat_id: ctx.chat.id });
  } catch (err) {
    errorHandler({ err, ctx, name: 'index.js/bot.start()' });
  }
};
