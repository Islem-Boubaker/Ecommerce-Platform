import express from "express";
import {
  createOrder,
  deleteorders,
  updateorders,
  getallorders,
  getordersbyuser,
  deleteProductFromOrder,
  updateProductFromOrder
} from "../controllers/Orders.controller.js";
const router = express.Router();
router
  .post("/order/createorder/:userId/:productId", createOrder)
  .put("/order/updateorder/:id", updateorders)
  .delete("/order/deleteorder/:id", deleteorders)
  .delete(
    "/order/:orderId/product/:productId",
    deleteProductFromOrder
)
.put(
  "/order/:orderId/product/:productId",
  updateProductFromOrder
)
  .get("/order/getallorders", getallorders)
  .get("/order/getordersbyuser/:id", getordersbyuser)

export default router;
