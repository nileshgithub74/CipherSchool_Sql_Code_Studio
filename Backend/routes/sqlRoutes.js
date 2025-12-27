import express from 'express';
import { 
  loadAssignment, 
  executeQuery, 
  validateUserAnswer
} from '../controller/sqlController.js';

const router = express.Router();

// Load assignment into PostgreSQL sandbox
router.post('/assignment/load', loadAssignment);

// Execute SQL query
router.post('/query/execute', executeQuery);

// Validate user's answer
router.post('/query/validate', validateUserAnswer);

export default router;