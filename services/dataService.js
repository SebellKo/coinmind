const {
  insertLastPostData,
  findLastPostData,
} = require('../models/lastPostData');
const { insertPostsData, getAllData } = require('../models/postsData');
const { extractByDateAndTime } = require('../utils/coins/extractByDateAndTime');
const { filterData } = require('../utils/data/filterData');
const { scrapDC } = require('./scrapService');

const insertInitialCoinData = async () => {
  const posts = [];

  for (let i = 1; i < 2; i++) {
    const currentTitle = await scrapDC(i);
    posts.push(...currentTitle);
  }

  const lastPostNum = posts[0].postNum;

  await insertLastPostData(lastPostNum);

  const extractedData = await extractByDateAndTime(posts);

  await insertPostsData(extractedData);
};

const insertCoinData = async () => {
  const posts = [];
  const lastPostNum = await findLastPostData();
  let page = 1;

  while (true) {
    const currentTitle = await scrapDC(page);
    const lastPostIndex = currentTitle.findIndex(
      (item) => item.postNum === lastPostNum
    );

    if (lastPostIndex !== -1) {
      posts.push(...currentTitle.slice(0, lastPostIndex));
      break;
    }

    posts.push(...currentTitle);
    page++;
  }

  const updatedLastPostNum = posts[0].postNum;
  await insertLastPostData(updatedLastPostNum);

  const extractedData = await extractByDateAndTime(posts);

  await insertPostsData(extractedData);
};

const getFilteredData = async (filter) => {
  const data = await getAllData();

  const filteredData = filterData(data, filter);

  return filteredData;
};

module.exports = { insertInitialCoinData, insertCoinData, getFilteredData };
