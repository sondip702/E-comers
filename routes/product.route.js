import express from "express";

import {createProduct} from "../controller/product.controller.js";
import { verifyUser } from "../utility/auth.middleware.js";
import { isAdmin } from "../utility/admin.middleware.js";
const product = express.Router();

// Create a new product
product.post("/create", verifyUser, createProduct);

export default product;