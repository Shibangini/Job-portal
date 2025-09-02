import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { applyJob, getAppliedJobs, getApplicants, UpdateStatus } from '../controllers/company.controller.js';

const router = express.Router();

router.route('/apply/:id').get(isAuthenticated, applyJob);
router.route('/get').get(isAuthenticated, getAppliedJobs);
router.route('/:id/applicants').get(isAuthenticated, getApplicants);
router.route('/status/:id/update').post(isAuthenticated, UpdateStatus);

export default router;