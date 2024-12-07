const checkLongStr = (title) => {
  return title.includes('롱');
};

const checkShortStr = (title) => {
  return title.includes('숏');
};

const checkCoinStr = (title, upbitCoins) => {
  const deletedSpaceTitle = title.replaceAll(' ', '').trim();
  const includedCoins = upbitCoins.filter((coin) =>
    deletedSpaceTitle.includes(coin)
  );

  return includedCoins;
};

module.exports = { checkCoinStr, checkLongStr, checkShortStr };
