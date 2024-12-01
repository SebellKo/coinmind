const { parseDateTime } = require('../helper/parseDateTime');

const groupAndFormat = (data) => {
  const grouped = {};

  data.forEach((item) => {
    const postDate = parseDateTime(item.date, item.time);
    const dayStart = new Date(
      postDate.getFullYear(),
      postDate.getMonth(),
      postDate.getDate()
    );
    const timeDiff = postDate - dayStart;

    const intervalIndex = Math.floor(timeDiff / (5 * 60 * 1000));

    const intervalStart = new Date(
      dayStart.getTime() + intervalIndex * (5 * 60 * 1000)
    );
    const intervalEnd = new Date(intervalStart.getTime() + 5 * 60 * 1000);
    const intervalKey = `${intervalStart
      .toTimeString()
      .slice(0, 5)}-${intervalEnd.toTimeString().slice(0, 5)}`;

    if (!grouped[item.date]) grouped[item.date] = {};
    if (!grouped[item.date][intervalKey]) grouped[item.date][intervalKey] = [];

    grouped[item.date][intervalKey].push({
      postNum: item.postNum,
      title: item.title,
      time: item.time,
    });
  });

  return Object.entries(grouped).map(([date, intervals]) => ({
    date,
    data: Object.entries(intervals).map(([time, posts]) => ({
      time,
      posts,
    })),
  }));
};

module.exports = { groupAndFormat };
