import Product from "../models/Product.model.js";
export const addProduct = async (req, res) => {
  try {
   
    const filePaths = req.files.map(file => file.path);

   
    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: filePaths, // all uploaded image paths
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
