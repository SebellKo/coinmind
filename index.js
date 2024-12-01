const { extractByDateAndTime } = require('./services/dataService');
const { scrapDC } = require('./services/scrapService');

const main = async () => {
  const posts = [];
  for (let i = 1; i < 10; i++) {
    const currentTitle = await scrapDC(i);
    posts.push(...currentTitle);
  }

  const extractedData = extractByDateAndTime(posts);

  console.log(extractedData);
};

main();
