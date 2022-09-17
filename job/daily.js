require('dotenv').config();
const { Telegraf } = require('telegraf');
const { getUser, getConfig } = require('../database');
const { getContents } = require('../utils/content');
const errorHandler = require('../utils/errorHandler');
const bot = new Telegraf(process.env.BOT_TOKEN);

(async () => {
  try {
    const users = await getUser({ follow: true });

    const _USER_FOUND = users.data.length;
    if (_USER_FOUND) {
      const { last_date_checked } = (await getConfig()).data[0];
      let contents = await getContents(last_date_checked).then(
        ({ filteredContents, randomContents }) => {
          if (filteredContents.length) return filteredContents;
          return randomContents;
        }
      );

      users.data.forEach((user) => {
        const chat_id = user.chat_id;
        bot.telegram.sendMessage(chat_id, contents.join('\n\n'), {
          parse_mode: 'HTML',
        });
      });
    }
  } catch (err) {
    errorHandler({ err, name: 'job/daily.js' });
  }
})();
