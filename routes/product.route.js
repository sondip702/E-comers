import express from "express";

import {createProduct} from "../controller/product.controller.js";
import Auth from "../model/auth.model.js";
const product = express.Router();

// Create a new product
product.post("/create", Auth,createProduct);

export default product;