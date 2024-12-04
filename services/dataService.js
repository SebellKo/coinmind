const {
  insertLastPostData,
  findLastPostData,
} = require('../models/lastPostData');
const { insertPostsData } = require('../models/postsData');
const { extractByDateAndTime } = require('../utils/coins/extractByDateAndTime');
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

module.exports = { insertInitialCoinData, insertCoinData };
