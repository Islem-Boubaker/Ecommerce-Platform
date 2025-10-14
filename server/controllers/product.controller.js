import Product from "../models/Product.model.js";
export const addProduct = async (req, res) => {
  try {
    const filePaths = req.files.map((file) => file.path);

    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: filePaths,
    };

    // TODO: Save productData to DB
    Product.create(productData);

    res.status(201).json({
      message: "Product added successfully",
      product: productData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
export const updateproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const product = await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};
export const getproductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({  product });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({
      message: "Server error while getting product",
      error: error.message,
    });
  }
};

export const getallproducts = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find();

    // Send as JSON response
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while getting products" });
  }
};

export const getproductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.status(200).json({ message: "Products found successfully", products });
  } catch (error) {
    console.error("Error getting products by category:", error);
    res
      .status(500)
      .json({ message: "Error getting products", error: error.message });
  }
};
  