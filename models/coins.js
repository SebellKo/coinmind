const { connectDB } = require('../db/db');

const insertCoins = async (upbitCoins) => {
  try {
    const db = (await connectDB).db(process.env.MONGODB_COLLECTION_NAME);
    const collection = await db.collection('coins');

    const bulkOperations = upbitCoins.map((item) => ({
      updateOne: {
        filter: { korean_name: item.korean_name },
        update: { $set: item },
        upsert: true,
      },
    }));

    const result = collection.bulkWrite(bulkOperations);

    return result;
  } catch (error) {
    console.log('upbit coins 삽입 에러', error);
    throw error;
  }
};

const findAllCoins = async () => {
  try {
    const db = (await connectDB).db(process.env.MONGODB_COLLECTION_NAME);
    const collection = await db.collection('coins');

    const result = collection.find().toArray();

    return result;
  } catch (error) {
    console.log('all coins 찾기 에러', error);
    throw error;
  }
};

module.exports = { insertCoins, findAllCoins };
