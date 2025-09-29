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

export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // Find existing order for this user
    let order = await Orders.findOne({ userId: orderData.userId });

    if (order) {
      // Append products to existing order
      if (Array.isArray(orderData.products)) {
        for (const item of orderData.products) {
          order.products.push({
            productId: item.productId,
            name: item.name,
            image: item.image,
            quantity: item.quantity,
            price: item.price,
          });
        }
      }

      // Recalculate total
      order.totalPrice =
        order.products.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) + (order.deliveryFee || 0);

      order.updatedAt = new Date();
      await order.save();
      return res
        .status(200)
        .json({ message: "Product added to order successfully", order });
    }

    // Create new order
    const products = Array.isArray(orderData.products)
      ? orderData.products
      : [];
    const deliveryFee =
      typeof orderData.deliveryFee === "number" ? orderData.deliveryFee : 0;
    const totalPrice =
      products.reduce((total, item) => total + item.price * item.quantity, 0) +
      deliveryFee;

    order = await Orders.create({
      userId: orderData.userId,
      products,
      deliveryFee,
      totalPrice,
      shippingAddress: orderData.shippingAddress,
      location: orderData.location,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating/updating order:", error);
    return res
      .status(500)
      .json({ message: "Error creating/updating order", error: error.message });
  }
};

export const deleteProductFromOrder = async (req, res) => {
  try {
    const { orderId, productId } = req.params;

    // Find the order first
    const order = await Orders.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.products.length > 1) {
      // Remove the product from the products array
      order.products = order.products.filter(
        (item) => item.productId.toString() !== productId.toString()
      );

      // Recalculate total price
      order.totalPrice =
        order.products.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) + (order.deliveryFee || 0);

      order.updatedAt = new Date();
      await order.save();

      return res.status(200).json({
        message: "Product removed from order successfully",
        order,
      });
    } else {
      // If only one product, delete the whole order
      await Orders.findByIdAndDelete(orderId);

      return res.status(200).json({
        message: "Order deleted because it contained only one product",
      });
    }
  } catch (error) {
    console.error("Error deleting product from order:", error);
    return res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};

