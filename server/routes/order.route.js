import express from "express";
import {
  createorder,
  deleteorder,
  updateOrder,

} from "../controllers/Orders.controller.js";
const router = express.Router();
router
  .post("/order/create", createorder)
  .put("/order/updateorder/:id", updateOrder)
  .delete("/order/deleteorder/:id", deleteorder)

export default router;
