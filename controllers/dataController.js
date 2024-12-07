const { getFilteredData } = require('../services/dataService');

exports.getData = async (req, res, next) => {
  try {
    const { filter } = req.query;
    const data = await getFilteredData(filter);

    res.json(data);
  } catch (error) {
    console.log('get data 오류', error);
    next(error);
  }
};
