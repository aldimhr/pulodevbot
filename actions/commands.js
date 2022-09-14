const { getContents } = require('../utils/content.js');
const errorHandler = require('../utils/errorHandler.js');

exports.follow = (ctx) => {
  try {
    const userIsAdmin = ctx.state._user_is_admin;
    const isGroup = ctx.chat.id < 0;

    if (isGroup) {
      if (userIsAdmin) {
      } else {
      }
    } else {
      ctx.reply(message.follow, {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } catch (err) {
    errorHandler({ err, ctx, name: 'index.js/bot.command("follow")' });
  }
};

exports.unfollow = (ctx) => {
  try {
    const userIsAdmin = ctx.state._user_is_admin;
    const isGroup = ctx.chat.id < 0;

    if (isGroup) {
      if (userIsAdmin) {
      } else {
      }
    } else {
      ctx.reply(message.unfollow, {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } catch (err) {
    errorHandler({ err, ctx, name: 'index.js/bot.command("unfollow")' });
  }
};

exports.latest = async (ctx) => {
  try {
    let lastDateChecked = new Date();
    lastDateChecked.setDate(lastDateChecked.getDate() - 10);

    let getposts = await getContents(lastDateChecked).then((data) =>
      data.map(
        ({ title, owner, url, contributor, media }) =>
          `<a href="${url.trim()}"><b>${title.trim()}</b></a> | ${media.trim()} | ${
            owner === '' ? contributor.trim() : owner.trim()
          }`
      )
    );

    ctx.reply(getposts.join('\n\n'), {
      parse_mode: 'HTML',
    });
  } catch (err) {
    errorHandler({ err, ctx, name: 'index.js/bot.command("latest")' });
  }
};
