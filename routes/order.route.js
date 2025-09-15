import express from 'express';
import { createOrder, getMyOrders, getOrderById, cancelOrder, getAllOrders, updateOrderStatus, getSalesStats } from '../controller/order.controller.js';
import { verifyUser } from '../utility/auth.middleware.js';
import {isAdmin} from '../utility/admin.middleware.js';

const order = express.Router();

order.post('/create', verifyUser, createOrder);

order.get('/my-orders', verifyUser, getMyOrders);

order.get('/:id', verifyUser, getOrderById);

order.put('/cancel/:id', verifyUser, cancelOrder);

order.get('/all', isAdmin, getAllOrders);

order.put('/update-status/:id', isAdmin, updateOrderStatus);

order.get('/sales-stats', isAdmin, getSalesStats);

export default order;