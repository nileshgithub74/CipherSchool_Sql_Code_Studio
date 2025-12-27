import Assignment from '../models/assignmentModel.js';

// Get all active assignments
export const getAllAssignments = async (req, res) => {
  const assignments = await Assignment.find({ isActive: true });
  res.json({
    success: true,
    allAssignment: assignments
  });
};

// Get assignment by ID
export const getAssignmentById = async (req, res) => {
  const { id } = req.params;
  const assignment = await Assignment.findById(id);
  res.json({
    success: true,
    data: assignment
  });
};

// Create new assignment
export const createAssignment = async (req, res) => {
  const assignment = new Assignment(req.body);
  const savedAssignment = await assignment.save();
  res.status(201).json({
    success: true,
    data: savedAssignment
  });
};

// Update assignment
export const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const assignment = await Assignment.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );
  res.json({
    success: true,
    data: assignment
  });
};

// Delete assignment
export const deleteAssignment = async (req, res) => {
  const { id } = req.params;
  const assignment = await Assignment.findByIdAndDelete(id);
  res.json({
    success: true,
    message: 'Assignment deleted successfully'
  });
};