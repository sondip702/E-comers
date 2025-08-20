import express from 'express';
import { forgetPassword, login, resetPassword, signout, signup } from '../controller/auth.contrller.js';
import { verifyUser } from '../utility/auth.middleware.js';
import { profile } from '../controller/user.contrller.js';

const router = express.Router();

router.post('/signup', signup)

router.get('/login', login)

router.post('/signout', verifyUser, signout)

router.get('/profile', verifyUser, profile)

router.post('/forget-password', forgetPassword)

router.post('/reset-password/:token', resetPassword)

// router.put('/profile', updateProfile)

// router.put('/password', updatePassword)

export default router;