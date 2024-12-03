const { CronJob } = require('cron');
const { insertCoinNames } = require('../utils/coins/insertIncludesCoin');

const { insertCoinData } = require('./dataService');

const insertCoinNamesJob = () => {
  const job = new CronJob(
    '0 0 * * * *',
    () => {
      insertCoinNames();
    },
    {
      timezone: 'Asia/Seoul',
    }
  );

  return job;
};

const insertCoinDataJob = () => {
  const job = new CronJob(
    '*/5 * * * * *',
    () => {
      insertCoinData();
    },
    {
      timezone: 'Asia/Seoul',
    }
  );

  return job;
};

module.exports = { insertCoinNamesJob, insertCoinDataJob };
