const { getTimeRange } = require('./getTimeRange');
const { parseTime } = require('../helper/parseTime');

const filterData = (data, filter) => {
  const parseDateTime = (date, time) => {
    const [startTime] = time.split('-');
    return new Date(`${date}T${startTime}:00`);
  };

  const sortedData = data.sort((a, b) => {
    const dateA = parseDateTime(a.date, a.time);
    const dateB = parseDateTime(b.date, b.time);
    return dateA - dateB;
  });

  const timeRange = getTimeRange(filter);
  const filteredData = [];
  let startTime = parseDateTime(sortedData[0].date, sortedData[0].time);

  let currentGroup = [];

  for (const entry of sortedData) {
    const entryTime = parseDateTime(entry.date, entry.time);

    if (entryTime - startTime < timeRange) {
      currentGroup.push(entry);
    } else {
      filteredData.push(currentGroup);
      currentGroup = [entry];
      startTime = entryTime;
    }
  }

  if (currentGroup.length > 0) {
    filteredData.push(currentGroup);
  }

  const mergeCoins = (baseCoins, targetCoins) => {
    const merged = { ...baseCoins };

    Object.entries(targetCoins).forEach(([key, value]) => {
      merged[key] = (merged[key] || 0) + value;
    });

    return merged;
  };

  const mergeData = (dataArray) => {
    const mergedData = dataArray.map((item) => {
      return item.reduce(
        (acc, obj) => {
          acc.long = (acc.long || 0) + obj.long;
          acc.short = (acc.short || 0) + obj.short;
          acc.coins = mergeCoins(acc.coins, obj.coins);
          acc.time = acc.time || obj.time;
          return acc;
        },
        {
          date: item[0].date,
          time: parseTime(item),
        }
      );
    });

    return mergedData;
  };

  const mergedData = mergeData(filteredData);

  return mergedData;
};

module.exports = { filterData };
