const { checkCoinStr } = require('../helper/checkStr');

const insertIncludesCoin = (title, currentCoinObj, upbitCoins) => {
  const titleIncludedCoins = checkCoinStr(title, upbitCoins);

  const resultObj = { ...currentCoinObj };
  const includedCoinsKey = Object.keys(resultObj);

  titleIncludedCoins.forEach((includedCoinItem) => {
    if (includedCoinsKey.length === 0) return (resultObj[includedCoinItem] = 1);

    for (const coinItem of includedCoinsKey) {
      if (coinItem === includedCoinItem) {
        resultObj[includedCoinItem] += 1;
        break;
      }
      resultObj[includedCoinItem] = 1;
    }
  });

  return resultObj;
};

module.exports = { insertIncludesCoin };
