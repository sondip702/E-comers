import express from "express";

import {createProduct} from "../controller/product.controller.js";
const product = express.Router();

// Create a new product
product.post("/", createProduct);

export default product;