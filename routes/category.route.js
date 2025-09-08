import express from 'express';
import { createCategory,deleteCategory, getAllCategories,  updateCategory} from '../controller/category.controller.js';
import { verifyUser } from '../utility/auth.middleware.js';

const category = express.Router();

category.post('/', verifyUser, createCategory);

category.get('/', getAllCategories);

category.put('/:id', verifyUser, updateCategory);

category.delete('/:id', verifyUser, deleteCategory);

export default category;