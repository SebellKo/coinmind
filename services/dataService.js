const {
  insertLastPostData,
  findLastPostData,
} = require('../models/lastPostData');
const { insertPostsData } = require('../models/postsData');
const { extractByDateAndTime } = require('../utils/coins/extractByDateAndTime');
const { scrapDC } = require('./scrapService');

const insertInitialCoinData = async () => {
  const posts = [];

  for (let i = 1; i < 10; i++) {
    const currentTitle = await scrapDC(i);
    posts.push(...currentTitle);
  }

  const lastPost = posts[posts.length - 1];

  await insertLastPostData(lastPost.postNum);

  const extractedData = await extractByDateAndTime(posts);

  await insertPostsData(extractedData);
};

const insertCoinData = async () => {
  const posts = [];

  while (true) {
    let page = 1;
    const lastPostNum = await findLastPostData();
    const currentTitle = await scrapDC(page);
    const lastPostIndex = currentTitle.findIndex(
      (item) => item.postNum === lastPostNum
    );

    if (lastPostIndex !== -1) {
      posts.concat(currentTitle.slice(0, lastPostIndex));
      break;
    }

    posts.push(...currentTitle);
    page++;
  }

  const extractedData = extractByDateAndTime(posts);

  await insertPostsData(extractedData);
};

module.exports = { insertInitialCoinData, insertCoinData };
