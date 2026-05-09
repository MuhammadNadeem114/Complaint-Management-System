const express = require('express');
const {
  createComplaint,
  getAllComplaints,
  getUserComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  getComplaintStats,
} = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const router = express.Router();

router.use(protect);

router.post('/', createComplaint);
router.get('/user', getUserComplaints);
router.get('/stats', getComplaintStats);
router.get('/:id', getComplaintById);
router.delete('/:id', deleteComplaint);
router.get('/', authorize(['admin']), getAllComplaints);
router.put('/:id', authorize(['admin']), updateComplaint);

module.exports = router;
