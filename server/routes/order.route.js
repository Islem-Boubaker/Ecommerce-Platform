import express from "express";
import {
  createOrder,
  deleteorders,
  updateorders,
  getallorders,
  getordersbyuser,
  deleteProductFromOrder
} from "../controllers/Orders.controller.js";
const router = express.Router();
router
  .post("/order/createorder", createOrder)
  .put("/order/updateorder/:id", updateorders)
  .delete("/order/deleteorder/:id", deleteorders)
  .delete(
    "/order/:orderId/product/:productId",
    deleteProductFromOrder
  )
  .get("/order/getallorders", getallorders)
  .get("/order/getordersbyuser/:id", getordersbyuser)

export default router;
