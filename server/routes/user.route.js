import express from "express";
import User from "../models/User.model.js";


const router = express.Router();


router.post("user/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
});


export default router;
