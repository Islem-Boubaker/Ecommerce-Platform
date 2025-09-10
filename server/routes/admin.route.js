import express from "express";
import Product from "../models/Product.model.js";
import multer from "multer";
import fs from "fs";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = `uploads/${req.body.name}`;
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name+ "-" + Date.now() + ".png");
  },
});

const upload = multer({ storage: storage });


router.post(
  "/admin/addproduct",
  upload.array("images"),
  async (req, res) => {
    try {
      const productData = req.body;

     
      const images = req.files.map((file) => file.filename);

      const newProduct = new Product({
        ...productData,
        images: images,
      });

      const savedProduct = await newProduct.save();

      res.status(201).json({
        message: "Product added successfully with multiple images"
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error adding product");
    }
  }
);

export default router;