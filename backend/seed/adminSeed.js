const bcrypt = require('bcryptjs');
const { readUsers, writeUsers, generateId } = require('../db');

const seedAdmin = async () => {
  try {
    const users = readUsers();
    const existingAdmin = users.find((u) => u.role === 'admin');
    if (existingAdmin) {
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 10);
    const adminUser = {
      id: generateId(),
      name: process.env.ADMIN_NAME || 'System Admin',
      email: process.env.ADMIN_EMAIL || 'admin@scms.local',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    };

    users.push(adminUser);
    writeUsers(users);
    console.log('✓ Admin user created:', adminUser.email);
  } catch (error) {
    console.error('Admin seed error:', error.message);
  }
};

module.exports = seedAdmin;
