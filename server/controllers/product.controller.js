import Product from "../models/Product.model.js";

// add product controller
export const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const images = req.files.map((file) => file.filename);

    const newProduct = new Product({
      ...productData,
      images,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully with multiple images",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};
