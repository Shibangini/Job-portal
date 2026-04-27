import express from 'express';
import { register, login, logout, updateProfile, serveResume } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

import multer from 'multer';
const upload = multer();

const router = express.Router();

router.route('/register').post(upload.single('file'), register);
router.route('/login').post(login);
router.route('/profile/update').post(isAuthenticated, upload.single('file'), updateProfile);
router.route('/profile/resume').get(isAuthenticated, serveResume);
router.route('/logout').get(logout);

export default router;