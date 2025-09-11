import express from "express";
import multer from "multer";
import fs from "fs";
import { addProduct } from "../controllers/product.controller.js";
import { deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = `uploads/${req.body.name}`;
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.name}-${Date.now()}.png`);
  },
});

const upload = multer({ storage });

// Routes
router.post("/admin/addproduct", upload.array("images"), addProduct);
router.delete("/admin/deleteuser/:id", deleteUser);

export default router;
