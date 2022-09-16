const { commands } = require('../config/constans.js');
const errorHandler = require('../utils/errorHandler.js');

module.exports = async (ctx, next) => {
  ctx.telegram.setMyCommands(commands, { type: 'chat', chat_id: ctx.chat.id });

  if (ctx.chat.id > 0) {
    ctx.state._group = false;
    return next();
  }

  return await ctx.telegram
    .getChatAdministrators(ctx.chat.id)
    .then((data) => {
      if (!data || !data.length) return;
      ctx.state._group = true;
      ctx.state._admins = data;
      ctx.state._user_is_admin = data.some((admin) => admin.user.id === ctx.from.id);
    })
    .catch((err) => {
      errorHandler({ ctx, err, name: 'index.js/bot.use()' });
    })
    .finally(() => next(ctx));
};
