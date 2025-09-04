import express from 'express';
import { addToCart,updateCartItem,removeCartItem, getUserCart } from '../controller/cart.controller.js';
import { verifyUser } from '../utility/auth.middleware.js';
const cart = express.Router();

cart.post('/add', verifyUser, addToCart);
cart.put('/update/:cartItemId', verifyUser, updateCartItem);
cart.delete('/remove/:cartItemId', verifyUser, removeCartItem);
cart.get('/', verifyUser, getUserCart);

export default cart;