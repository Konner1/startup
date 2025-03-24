const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log(`Connected to MongoDB: ${config.hostname}`);
    return client.db('rental'); // Change 'rental' to your actual database name
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

module.exports = { connectDB };
