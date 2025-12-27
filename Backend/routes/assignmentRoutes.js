import express from 'express';
import { 
  getAllAssignments, 
  getAssignmentById, 
  createAssignment, 
  updateAssignment, 
  deleteAssignment 
} from '../controller/assignmentController.js';

const router = express.Router();

// Get all active assignments
router.get('/', getAllAssignments);

// Get assignment by ID
router.get('/:id', getAssignmentById);

// Create new assignment
router.post('/', createAssignment);

// Update assignment
router.put('/:id', updateAssignment);

// Delete assignment
router.delete('/:id', deleteAssignment);

export default router;