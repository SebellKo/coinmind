const parseTime = (arr) => {
  return `${arr[0].time.split('-')[0]}-${
    arr[arr.length - 1].time.split('-')[1]
  }`;
};

module.exports = { parseTime };
