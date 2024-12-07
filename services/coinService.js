const { insertCoins, findAllCoins } = require('../models/coins');
const { getCoinsFromUpbit } = require('../utils/coins/getCoinsFromUpbit');

const insertCoinNames = async () => {
  const coins = await getCoinsFromUpbit();
  await insertCoins(coins);
};

const getCoinNames = async () => {
  const coinsInfo = await findAllCoins();
  const coinNames = coinsInfo.map((item) => item.korean_name);
  return coinNames;
};

module.exports = { insertCoinNames, getCoinNames };
