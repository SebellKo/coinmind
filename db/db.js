const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = `mongodb+srv://fulfilled:${process.env.COINMIND_MONGODB_SECRET_KEY}@${process.env.MONGODB_COLLECTION_NAME}.jcxdn.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGODB_COLLECTION_NAME}`;
let connectDB;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}

module.exports = { connectDB };
