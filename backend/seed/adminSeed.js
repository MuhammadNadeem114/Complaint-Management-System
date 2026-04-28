const bcrypt = require('bcryptjs');
const { User } = require('../db');

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 10);
    const adminUser = new User({
      name: process.env.ADMIN_NAME || 'System Admin',
      email: process.env.ADMIN_EMAIL || 'admin@scms.local',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('✓ Admin user created:', adminUser.email);
  } catch (error) {
    console.error('Admin seed error:', error.message);
  }
};

module.exports = seedAdmin;
