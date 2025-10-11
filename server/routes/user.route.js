import express from "express";
import { getallproducts, getproductById } from "../controllers/product.controller.js";
import { createComment, deleteComment, getComments, updateComment } from "../controllers/Comment.controllers.js";
const router = express.Router();

router
  .get("/user/getproduct", getallproducts)
  .get("/user/getproduct/:id", getproductById)
  .post("/user/createcomment/:productId/:userId", createComment)
  .put("/user/updatecomment/:id/:userId", updateComment)
  .delete("/user/deletecomment/:id/:userId", deleteComment)
  .get("/user/getcomment/:productId", getComments);
export default router;
