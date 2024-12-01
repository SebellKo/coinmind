const { UPBIT_COINS } = require('../../constant/coins');

const checkLongStr = (title) => {
  return title.includes('롱');
};

const checkShortStr = (title) => {
  return title.includes('숏');
};

const checkCoinStr = (title) => {
  const deletedSpaceTitle = title.replaceAll(' ', '').trim();
  const includedCoins = UPBIT_COINS.filter((coin) =>
    deletedSpaceTitle.includes(coin)
  );

  return includedCoins;
};

module.exports = { checkCoinStr, checkLongStr, checkShortStr };
