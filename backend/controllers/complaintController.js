const { readComplaints, writeComplaints, readUsers, generateId } = require('../db');
const { sendComplaintEmail } = require('../services/emailService');

exports.createComplaint = async (req, res, next) => {
  try {
    const { title, description, category, priority } = req.body;
    if (!title || !description || !category || !priority) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const complaints = readComplaints();
    const users = readUsers();
    const currentUser = users.find((u) => u.id === req.user.id);

    const complaint = {
      _id: generateId(),
      title,
      description,
      category,
      priority,
      status: 'Pending',
      userId: req.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    complaints.push(complaint);
    writeComplaints(complaints);

    // Send email notification and include delivery status in logs
    let emailSent = false;
    if (currentUser) {
      emailSent = await sendComplaintEmail(complaint, currentUser.name, currentUser.email);
    }

    res.status(201).json({
      complaint,
      emailSent,
      message: emailSent
        ? 'Complaint submitted and email sent successfully.'
        : 'Complaint submitted, but email notification failed. Please check SMTP configuration.',
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllComplaints = async (req, res, next) => {
  try {
    const complaints = readComplaints();
    const users = readUsers();
    const enriched = complaints.map((c) => {
      const user = users.find((u) => u.id === c.userId);
      return {
        ...c,
        userId: user ? { name: user.name, email: user.email, role: user.role, _id: user.id } : null,
      };
    });
    res.json(enriched);
  } catch (error) {
    next(error);
  }
};

exports.getUserComplaints = async (req, res, next) => {
  try {
    const complaints = readComplaints();
    const userComplaints = complaints
      .filter((c) => c.userId === req.user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(userComplaints);
  } catch (error) {
    next(error);
  }
};

exports.updateComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;
    const complaints = readComplaints();
    const complaint = complaints.find((c) => c._id === id);

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    if (status) complaint.status = status;
    if (priority) complaint.priority = priority;
    complaint.updatedAt = new Date();

    writeComplaints(complaints);

    const users = readUsers();
    const user = users.find((u) => u.id === complaint.userId);
    res.json({
      ...complaint,
      userId: user ? { name: user.name, email: user.email, role: user.role, _id: user.id } : null,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteComplaint = async (req, res, next) => {
  try {
    const complaints = readComplaints();
    const complaint = complaints.find((c) => c._id === req.params.id);

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    if (complaint.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (complaint.status !== 'Pending') {
      return res.status(400).json({ error: 'Only pending complaints can be deleted' });
    }

    const filtered = complaints.filter((c) => c._id !== req.params.id);
    writeComplaints(filtered);
    res.json({ message: 'Complaint deleted' });
  } catch (error) {
    next(error);
  }
};

exports.getComplaintStats = async (req, res, next) => {
  try {
    const complaints = readComplaints();
    const match = req.user.role === 'admin' ? complaints : complaints.filter((c) => c.userId === req.user.id);

    const total = match.length;
    const pending = match.filter((c) => c.status === 'Pending').length;
    const inProgress = match.filter((c) => c.status === 'In Progress').length;
    const resolved = match.filter((c) => c.status === 'Resolved').length;

    res.json({ total, pending, inProgress, resolved });
  } catch (error) {
    next(error);
  }
};
