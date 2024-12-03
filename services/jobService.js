const { CronJob } = require('cron');
const { insertCoinNames } = require('../utils/coins/insertIncludesCoin');

const insertCoinNamesJob = () => {
  const insertCoinNamesJob = new CronJob(
    '0 0 * * * *',
    () => {
      insertCoinNames();
    },
    {
      timezone: 'Asia/Seoul',
    }
  );

  return insertCoinNamesJob;
};

module.exports = { insertCoinNamesJob };
