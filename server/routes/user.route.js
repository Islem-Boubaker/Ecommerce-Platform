import express from "express";
import { createuser } from "../controllers/user.controller.js";
import { getallproducts, getproductById } from "../controllers/product.controller.js";

const router = express.Router();

router
  .get("/user/getproduct", getallproducts)
  .get("/user/getproduct/:id", getproductById);

export default router;
