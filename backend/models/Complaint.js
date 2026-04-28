const mongoose = require('mongoose');

const historyEntrySchema = new mongoose.Schema(
  {
    action: { type: String, required: true, trim: true },
    comment: { type: String, trim: true },
    changedBy: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, trim: true },
      role: { type: String, enum: ['user', 'admin', 'system'], default: 'system' },
    },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, enum: ['Electricity', 'Water', 'Internet', 'Other'], default: 'Other' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    history: { type: [historyEntrySchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', complaintSchema);
