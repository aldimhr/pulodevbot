const { message } = require('../config/constans.js');
const { getUser, addUser } = require('../database/index.js');
const errorHandler = require('../utils/errorHandler.js');

module.exports = async (ctx) => {
  try {
    const { id: chat_id } = await ctx.from;

    const _IS_GROUP = ctx.state._group;
    if (_IS_GROUP) return;

    ctx.reply(message.welcome);

    const user = await getUser({ chat_id: chat_id });
    const _USER_NOT_FOUND = !user.data.length;

    if (_USER_NOT_FOUND) {
      const type = _IS_GROUP ? 'group' : 'private';
      await addUser({ chat_id, type });
    }
  } catch (err) {
    errorHandler({ err, ctx, name: 'index.js/bot.start()' });
  }
};
