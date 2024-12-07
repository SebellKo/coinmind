const { connectDB } = require('../db/db');

const insertPostsData = async (postsData) => {
  try {
    const db = (await connectDB).db(process.env.MONGODB_COLLECTION_NAME);
    const collection = db.collection('postsData');

    const result = await collection.insertMany(postsData);

    return result;
  } catch (error) {
    console.log('postsData 삽입 에러', error);
    throw error;
  }
};

const getAllData = async () => {
  try {
    const db = (await connectDB).db(process.env.MONGODB_COLLECTION_NAME);
    const collection = db.collection('postsData');

    const result = await collection.find().toArray();

    return result;
  } catch (error) {
    console.log('get all data 오류', error);
    throw error;
  }
};

module.exports = { insertPostsData, getAllData };
