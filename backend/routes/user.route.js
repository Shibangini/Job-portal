import express from 'express';
import { register, login, logout, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

import multer from 'multer';
const upload = multer();

const router = express.Router();

router.route('/register').post(upload.single('file'), register);
router.route('/login').post(login);
router.route('/profile/update').post(isAuthenticated,updateProfile);
router.route('/logout').get(logout);

export default router;