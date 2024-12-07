const { getCoinNames } = require('../services/coinService');

exports.getAllCoins = async (req, res, next) => {
  try {
    const coins = await getCoinNames();

    res.json(coins);
  } catch (error) {
    console.log('get all coins 오류', error);
    next(error);
  }
};
