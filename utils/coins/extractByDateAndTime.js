const extractByDateAndTime = (posts) => {
  const formattedData = groupAndFormat(posts);

  const extractedData = formattedData.flatMap((item) => {
    const currentDate = item.date;

    const extractedPostsData = item.data.map((dataItem) => {
      const currentTime = dataItem.time;

      const convertedData = dataItem.posts.reduce(
        (acc, cur) => {
          acc.long = checkLongStr(cur.title) ? acc.long + 1 : acc.long;
          acc.short = checkShortStr(cur.title) ? acc.short + 1 : acc.short;
          acc.coins = insertIncludesCoin(cur.title, acc.coins);

          return acc;
        },
        {
          date: currentDate,
          time: currentTime,
          long: 0,
          short: 0,
          coins: {},
        }
      );

      return convertedData;
    });

    return extractedPostsData;
  });

  return extractedData;
};

module.exports = { extractByDateAndTime };
