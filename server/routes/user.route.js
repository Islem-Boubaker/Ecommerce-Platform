import express from "express";
import { getallproducts, getproductById } from "../controllers/product.controller.js";
import { createComment, deleteComment, getComment, updateComment } from "../controllers/Comment.controllers.js";
const router = express.Router();

router
  .get("/user/getproduct", getallproducts)
  .get("/user/getproduct/:id", getproductById)
  .post("/user/createcomment/:userId/:productId", createComment)
  .put("/user/updatecomment/:userId/:productId", updateComment)
  .delete("/user/deletecomment/:userId/:productId", deleteComment)
  .get("/user/getcomment/:userId/:productId", getComment);

export default router;
