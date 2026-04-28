const { Complaint, User } = require('../db');
const { sendComplaintEmail } = require('../services/emailService');

const buildUserPayload = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
});

const buildComplaintResponse = (complaint) => {
  const result = complaint.toObject ? complaint.toObject() : { ...complaint };
  if (result.userId && result.userId._id) {
    result.userId = buildUserPayload(result.userId);
  } else if (result.userId) {
    result.userId = {
      id: result.userId.toString(),
      name: result.userId.name,
      email: result.userId.email,
      role: result.userId.role,
    };
  }
  return result;
};

exports.createComplaint = async (req, res, next) => {
  try {
    const { title, description, category, priority } = req.body;
    if (!title || !description || !category || !priority) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const currentUser = await User.findById(req.user.id);
    if (!currentUser) {
      return res.status(401).json({ error: 'Authenticated user not found' });
    }

    const complaint = new Complaint({
      title,
      description,
      category,
      priority,
      status: 'Pending',
      userId: currentUser._id,
      history: [
        {
          action: 'Created',
          comment: 'Complaint submitted by user',
          changedBy: {
            id: currentUser._id,
            name: currentUser.name,
            role: currentUser.role,
          },
        },
      ],
    });

    await complaint.save();

    const emailSent = await sendComplaintEmail(complaint, currentUser.name, currentUser.email);

    res.status(201).json({
      complaint: buildComplaintResponse(await complaint.populate('userId')),
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
    const complaints = await Complaint.find().sort({ createdAt: -1 }).populate('userId', 'name email role');
    res.json(complaints.map(buildComplaintResponse));
  } catch (error) {
    next(error);
  }
};

exports.getUserComplaints = async (req, res, next) => {
  try {
    const userComplaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 }).populate('userId', 'name email role');
    res.json(userComplaints.map(buildComplaintResponse));
  } catch (error) {
    next(error);
  }
};

exports.updateComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;
    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    const changedBy = {
      id: req.user.id,
      name: req.user.role === 'admin' ? 'Admin user' : 'User',
      role: req.user.role,
    };

    if (status && status !== complaint.status) {
      complaint.history.push({
        action: 'Status updated',
        comment: `Status changed from ${complaint.status} to ${status}`,
        changedBy,
      });
      complaint.status = status;
    }

    if (priority && priority !== complaint.priority) {
      complaint.history.push({
        action: 'Priority updated',
        comment: `Priority changed from ${complaint.priority} to ${priority}`,
        changedBy,
      });
      complaint.priority = priority;
    }

    await complaint.save();
    await complaint.populate('userId', 'name email role');

    res.json(buildComplaintResponse(complaint));
  } catch (error) {
    next(error);
  }
};

exports.deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    if (!complaint.userId.equals(req.user.id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (complaint.status !== 'Pending') {
      return res.status(400).json({ error: 'Only pending complaints can be deleted' });
    }

    await complaint.deleteOne();
    res.json({ message: 'Complaint deleted' });
  } catch (error) {
    next(error);
  }
};

exports.getComplaintStats = async (req, res, next) => {
  try {
    const complaints = req.user.role === 'admin'
      ? await Complaint.find()
      : await Complaint.find({ userId: req.user.id });

    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === 'Pending').length;
    const inProgress = complaints.filter((c) => c.status === 'In Progress').length;
    const resolved = complaints.filter((c) => c.status === 'Resolved').length;

    res.json({ total, pending, inProgress, resolved });
  } catch (error) {
    next(error);
  }
};
