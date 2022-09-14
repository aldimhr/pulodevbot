const errorHandler = require('../utils/errorHandler.js');

module.exports = async (ctx, next) => {
  if (ctx.chat.id > 0) return next();

  return await bot.telegram
    .getChatAdministrators(ctx.chat.id)
    .then((data) => {
      if (!data || !data.length) return;
      ctx.state._admins = data;
      ctx.state._user_is_admin = data.some((admin) => admin.user.id === ctx.from.id);
    })
    .catch((err) => {
      errorHandler({ ctx, err, name: 'index.js/bot.use()' });
    })
    .finally(() => next(ctx));
};
