const { getUser, updateUser, addUser, getConfig } = require('../database/index.js');
const errorHandler = require('../utils/errorHandler.js');
const { getContents } = require('../utils/content.js');
const { message } = require('../config/constans.js');

exports.follow = async (ctx) => {
  try {
    const chat_id = ctx.chat.id;
    const _GROUP = ctx.state._group;
    const _USER_IS_ADMIN = ctx.state._user_is_admin;

    if (!_GROUP || (_GROUP && _USER_IS_ADMIN)) {
      ctx.reply(message.follow, {
        reply_to_message_id: ctx.message.message_id,
      });

      const user = await getUser({ chat_id });
      const _USER_NOT_FOUND = !user.data.length;
      if (_USER_NOT_FOUND) {
        // add user to db
        await addUser({ chat_id, type: 'group', follow: true });
      } else {
        // update user in db
        const row = { follow: true };

        const _USER_HAS_NOT_FOLLOWED = !user.data[0].follow;
        if (_USER_HAS_NOT_FOLLOWED) {
          await updateUser({ chat_id, row });
        }
      }
    }
  } catch (err) {
    errorHandler({ err, ctx, name: 'command("follow")' });
  }
};

exports.unfollow = async (ctx) => {
  try {
    const chat_id = ctx.chat.id;
    const _GROUP = ctx.state._group;
    const _USER_IS_ADMIN = ctx.state._user_is_admin;

    if (!_GROUP || (_GROUP && _USER_IS_ADMIN)) {
      ctx.reply(message.unfollow, {
        reply_to_message_id: ctx.message.message_id,
      });

      const user = await getUser({ chat_id });
      const _USER_NOT_FOUND = !user.data.length;
      if (_USER_NOT_FOUND) {
        // add user to db
        await addUser({ chat_id, type: 'group', follow: false });
      } else {
        // update user in db
        const row = { follow: false };
        const _USER_HAS_FOLLOWED = user.data[0].follow;
        if (_USER_HAS_FOLLOWED) {
          await updateUser({ chat_id, row });
        }
      }
    }
  } catch (err) {
    errorHandler({ err, ctx, name: 'command("unfollow")' });
  }
};

exports.latest = async (ctx) => {
  try {
    const { last_date_checked } = (await getConfig()).data[0];

    let getposts = await getContents(last_date_checked).then(
      ({ filteredContents, randomContents }) => {
        if (filteredContents.length) return filteredContents;
        return randomContents;
      }
    );

    ctx.reply(getposts.join('\n\n'), {
      parse_mode: 'HTML',
    });
  } catch (err) {
    errorHandler({ err, ctx, name: 'command("latest")' });
  }
};
