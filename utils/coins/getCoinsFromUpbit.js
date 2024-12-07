const axios = require('axios');

const getCoinsFromUpbit = async () => {
  const response = await axios.get('https://api.upbit.com/v1/market/all');
  const coins = response.data;
  const krwCoins = coins.filter((item) => item.market.includes('KRW'));

  return krwCoins;
};

module.exports = { getCoinsFromUpbit };
