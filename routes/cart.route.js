import express from 'express';
import { addToCart,updateCartItem,removeCartItem, getUserCart, emptyCart } from '../controller/cart.controller.js';
import { verifyUser } from '../utility/auth.middleware.js';
const cart = express.Router();

// Add a product to the cart
cart.post('/add', verifyUser, addToCart);
// Update a cart item
cart.put('/update/:cartItemId', verifyUser, updateCartItem);
// Remove a cart item
cart.delete('/remove/:cartItemId', verifyUser, removeCartItem);
// Get user's cart
cart.get('/', verifyUser, getUserCart);
// Empty the cart
cart.delete('/empty', verifyUser, emptyCart);
// Export the cart router

export default cart;