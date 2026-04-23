const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data');
const usersFile = path.join(dbPath, 'users.json');
const complaintsFile = path.join(dbPath, 'complaints.json');

if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true });
}

const ensureFile = (file) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([]));
  }
};

ensureFile(usersFile);
ensureFile(complaintsFile);

const readUsers = () => JSON.parse(fs.readFileSync(usersFile, 'utf8'));
const writeUsers = (data) => fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));

const readComplaints = () => JSON.parse(fs.readFileSync(complaintsFile, 'utf8'));
const writeComplaints = (data) => fs.writeFileSync(complaintsFile, JSON.stringify(data, null, 2));

module.exports = {
  readUsers,
  writeUsers,
  readComplaints,
  writeComplaints,
  generateId: () => Math.random().toString(36).substring(7),
};
