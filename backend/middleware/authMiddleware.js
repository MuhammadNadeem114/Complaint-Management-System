const jwt = require('jsonwebtoken');
const { readUsers } = require('../db');

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user in JSON file database
    const users = readUsers();
    const user = users.find((u) => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized' });
  }
};
