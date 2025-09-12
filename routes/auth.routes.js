import express from 'express';
import { forgetPassword, login, resetPassword, signout, signup } from '../controller/auth.contrller.js';
import { verifyUser } from '../utility/auth.middleware.js';
import { profile } from '../controller/user.contrller.js';
import { updatePassword, updateProfile } from '../controller/user.contrller.js';
import {isAdmin} from '../utility/admin.middleware.js';

const router = express.Router();

router.post('/signup', signup)

router.get('/login', login)

router.post('/signout', verifyUser, signout)

router.get('/profile', verifyUser, profile)

router.post('/forget-password', forgetPassword)

router.post('/reset-password/:token', resetPassword)

router.put('/profile-update-admin', verifyUser,isAdmin,updateProfile)

router.get('/profile-admin', verifyUser, isAdmin,profile)

router.put('/password', verifyUser,isAdmin,updatePassword)

export default router;