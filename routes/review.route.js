import express from 'express';
import { addOrUpdateReview, getReviewsForProduct } from '../controller/review.controller.js';
import { verifyUser } from '../utility/auth.middleware.js';

const reviw = express.Router();

reviw.post('/products/:productId', verifyUser, addOrUpdateReview);

reviw.get('/products', getReviewsForProduct);

export default reviw;