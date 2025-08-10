import express from "express";

import { createProduct } from "../controller/product.controller.js";
const router = express.Router();

// Create a new product
router.post("/", createProduct);

export default product;