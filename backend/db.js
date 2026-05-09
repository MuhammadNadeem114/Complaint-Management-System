const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('./models/User');
const Complaint = require('./models/Complaint');

let memoryServer;

const connectDatabase = async () => {
  const uri = process.env.MONGO_URI?.trim();
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const connect = async (mongoUri) => {
    await mongoose.connect(mongoUri, options);
    console.log(`✓ Connected to MongoDB at ${mongoUri}`);
  };

  if (uri) {
    try {
      await connect(uri);
      return;
    } catch (error) {
      console.warn('⚠️ Failed to connect to MongoDB at MONGO_URI. Falling back to in-memory MongoDB.');
      console.warn(error.message);
    }
  }

  memoryServer = await MongoMemoryServer.create();
  const memoryUri = memoryServer.getUri();
  await connect(memoryUri);
  console.log('✓ Connected to in-memory MongoDB fallback');
};

const disconnectDatabase = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
  User,
  Complaint,
};
