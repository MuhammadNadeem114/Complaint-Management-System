const mongoose = require('mongoose');
const User = require('./models/User');
const Complaint = require('./models/Complaint');

const connectDatabase = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart-complaint-management';
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`✓ Connected to MongoDB at ${uri}`);
};

module.exports = {
  connectDatabase,
  User,
  Complaint,
};
