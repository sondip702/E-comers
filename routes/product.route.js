import express from "express";

import {createProduct, deleteProduct, updateProduct} from "../controller/product.controller.js";
import { verifyUser } from "../utility/auth.middleware.js";
import { isAdmin } from "../utility/admin.middleware.js";
const product = express.Router();

// Create a new product
product.post("/create", verifyUser, createProduct);
product.put("/update/:id", verifyUser,  updateProduct );
product.delete("/delete/:id", verifyUser, deleteProduct);
export default product;