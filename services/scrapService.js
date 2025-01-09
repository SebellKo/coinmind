const axios = require('axios');
const cheerio = require('cheerio');

const scrapDC = async (page) => {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0',
  ];

  const randomUserAgent =
    userAgents[Math.floor(Math.random() * userAgents.length)];

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await delay(1000);
  console.log(`${page}번째 페이지 작업중`);
  try {
    const response = await axios.get(
      `https://gall.dcinside.com/board/lists/?id=bitcoins_new1&page=${page}`,
      {
        headers: {
          'User-Agent': randomUserAgent,
          timeout: 5000,
        },
      }
    );

    const html = response.data;
    const $ = cheerio.load(html);

    const headlines = [];
    $('.ub-content').each((_, element) => {
      const title = $(element)
        .find('.gall_tit')
        .text()
        .replace(/\s+/g, ' ')
        .trim();
      const postNum = $(element).find('.gall_num').text();
      const postDate = $(element).find('.gall_date').attr('title');

      if (!isNaN(Number(postNum))) {
        const [date, time] = postDate.split(' ');
        headlines.push({
          postNum: postNum,
          title: title,
          date: date,
          time: time,
        });
      }
    });

    return headlines;
  } catch (error) {
    console.error(`page: ${page}, 크롤링 중 오류 발생:`, error.message);
    return [];
  }
};

module.exports = { scrapDC };
