require('dotenv').config();
const { Telegraf } = require('telegraf');
const { getUser, getConfig, updateConfig } = require('../database');
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
        async ({ filteredContents, randomContents, data }) => {
          if (filteredContents.length) {
            // update last_date_checked
            let newDate = data
              .map(function (e) {
                return e.created_at;
              })
              .sort()
              .reverse()[0];
            await updateConfig(newDate);

            return filteredContents;
          }
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
    console.log(err);
    errorHandler({ err, name: 'job/daily.js' });
  }
})();
