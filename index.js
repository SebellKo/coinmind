const express = require('express');

const dataRouter = require('./routes/data');
const coinsRouter = require('./routes/coins');
const { insertInitialCoinData } = require('./services/dataService');
const {
  insertCoinNamesJob,
  insertCoinDataJob,
} = require('./services/jobService');
const { insertCoinNames } = require('./services/coinService');

const app = express();
const port = 8080;

app.use('/data', dataRouter);
app.use('/coins', coinsRouter);

(async () => {
  await insertCoinNames();
  await insertInitialCoinData();

  console.log('initial done');
  insertCoinNamesJob().start();
  insertCoinDataJob().start();
})();

app.listen(port, async () => {
  console.log('server is running');
});
