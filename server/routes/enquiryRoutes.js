import express from 'express';
import { createEnquiry, getEnquiries } from '../controllers/enquiryController.js';
import { validateEnquiry } from '../middleware/validation.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// POST /api/enquiries - Submit a new enquiry (Rate-limited & Validated)
router.post('/', enquiryLimiter, validateEnquiry, createEnquiry);

// GET /api/enquiries - Retrieve enquiries for review
router.get('/', getEnquiries);

export default router;

