import Orders from "../models/Orders.model.js";

export const getordersbyuser = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Orders.find({ userId: id });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json({ message: "Orders found successfully", orders });
  } catch (error) {
    console.error("Error getting orders by user:", error);
    res
      .status(500)
      .json({ message: "Error getting orders", error: error.message });
  }
};
export const updateorders = async (req, res) => {
  try {
    const { id } = req.params;
    const orderData = req.body;
    const order = await Orders.findByIdAndUpdate(id, orderData, { new: true });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Error updating order:", error);
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

export const getallorders = async (req, res) => {
  try {
    const orders = await Orders.find();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json({ message: "Orders found successfully", orders });
  } catch (error) {
    console.error("Error getting all orders:", error);
    res
      .status(500)
      .json({ message: "Error getting orders", error: error.message });
  }
};
export const deleteorders = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully", order });
  } catch (error) {
    console.error("Error deleting order:", error);
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};
