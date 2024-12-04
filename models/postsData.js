const { connectDB } = require('../db/db');

const insertPostsData = async (postsData) => {
  try {
    const db = (await connectDB).db(process.env.MONGODB_COLLECTION_NAME); // 데이터베이스 이름
    const collection = db.collection('postsData'); // 컬렉션 이름

    const result = await collection.insertMany(postsData);

    return result;
  } catch (error) {
    console.log('postsData 삽입 에러', error);
    throw error;
  }
};

module.exports = { insertPostsData };
