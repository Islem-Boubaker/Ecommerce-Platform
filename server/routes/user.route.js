import express from "express";
import User from "../models/User.model.js";
import Product from "../models/Product.model.js";

const router = express.Router();

router.post("/user/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

router.get("/user/getproduct", async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find();

    // Send as JSON response
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while getting products" });
  }
});

export default router;
