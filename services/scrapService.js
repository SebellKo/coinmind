const axios = require('axios');
const cheerio = require('cheerio');

const scrapDC = async (page) => {
  try {
    const response = await axios.get(
      `https://gall.dcinside.com/board/lists/?id=bitcoins_new1&page=${page}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
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
    console.error('크롤링 중 오류 발생:', error.message);
    return [];
  }
};

module.exports = { scrapDC };
