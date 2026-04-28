const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const { initializeTransporter } = require('./services/emailService');
const seedAdmin = require('./seed/adminSeed');
const { connectDatabase, Complaint } = require('./db');

dotenv.config({ path: path.join(__dirname, '.env') });
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/complaints/resolve/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.query.token;
    if (!token || token !== process.env.EMAIL_ACTION_SECRET) {
      return res.status(401).send('<h1>Unauthorized</h1><p>Invalid or missing email action token.</p>');
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).send('<h1>Not Found</h1><p>Complaint not found.</p>');
    }

    if (complaint.status !== 'Resolved') {
      complaint.status = 'Resolved';
      complaint.history.push({
        action: 'Resolved via email link',
        comment: 'Complaint resolved through mobile-friendly email action',
        changedBy: { name: 'Email action', role: 'system' },
      });
      await complaint.save();
    }

    return res.send(`<h1>Complaint Resolved</h1><p>Complaint <strong>${complaint.title}</strong> has been marked as resolved.</p>`);
  } catch (error) {
    console.error(error);
    return res.status(500).send('<h1>Error</h1><p>Unable to resolve complaint.</p>');
  }
});

app.use('/api/complaints', complaintRoutes);

app.post('/api/test-email', async (req, res) => {
  try {
    const { sendComplaintEmail } = require('./services/emailService');
    const testComplaint = {
      _id: 'test-123',
      title: 'Test Email Notification',
      description: 'This is a test email to verify the email service is working.',
      category: 'Other',
      priority: 'Medium',
      status: 'Pending',
      createdAt: new Date(),
    };
    const emailSent = await sendComplaintEmail(testComplaint, 'Test User', 'test@example.com');
    res.json({ success: true, emailSent, message: 'Test email sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Smart Complaint Management API is running' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const startServer = async () => {
  await connectDatabase();
  await seedAdmin();
  await initializeTransporter();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Server startup error:', error);
  process.exit(1);
});
