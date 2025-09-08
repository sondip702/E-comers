import express from "express";

import {createProduct, deleteProduct, updateProduct} from "../controller/product.controller.js";
import { verifyUser } from "../utility/auth.middleware.js";
const product = express.Router();

product.post("/create", verifyUser, createProduct);
product.put("/update/:id", verifyUser,  updateProduct );
product.delete("/delete/:id", verifyUser, deleteProduct);
export default product;