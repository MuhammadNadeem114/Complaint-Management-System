const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const seedAdmin = require('./seed/adminSeed');

dotenv.config({ path: path.join(__dirname, '.env') });
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Smart Complaint Management API is running' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedAdmin();
});
