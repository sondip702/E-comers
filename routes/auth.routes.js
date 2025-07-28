import express from 'express';
import { login, signout, signup } from '../controller/auth.contrller.js';
import { verifyUser } from '../utility/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup)

router.get('/login', login)

router.post('/signout', verifyUser, signout)

// router.get('/forget-password', forgetPassword)

// router.post('/reset-password/:token', resetPassword)

// router.get('/profile', profile)

// router.put('/profile', updateProfile)

// router.put('/password', updatePassword)

export default router;