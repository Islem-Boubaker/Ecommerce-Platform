import express from "express";
import multer from "multer";
import fs from "fs";
import {
  addProduct,
  deleteproduct,
  updateproduct,
  getallproducts,
  getproductById,
  getproductsByCategory,
} from "../controllers/product.controller.js";
import {
  deleteUser,
  getUserById,
  getUserbyname,
  getAllUsers,
  createuser,
  updateUser,
} from "../controllers/user.controller.js";
import {
  getordersbyuser,
  getallorders,
  updateorders,
  deleteorders,
} from "../controllers/Orders.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

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
router
  .post("/admin/addproduct", upload.array("images"), addProduct)
  .delete("/admin/deleteuser/:id",authMiddleware,deleteUser)
  .get("/admin/getallproducts", getallproducts)
  .get("/admin/getproduct/:id", getproductById)
  .get("/admin/getproductByCategory/:category", getproductsByCategory)
  .put("/admin/updateproduct/:id",authMiddleware, updateproduct)
  .delete("/admin/deleteproduct/:id",authMiddleware, deleteproduct)
  .get("/admin/getuser/:id", getUserById)
  .get("/admin/getuser/:name", getUserbyname)
  .get("/admin/getallusers", getAllUsers)
  .post("/admin/createuser",authMiddleware,createuser)
  .put("/admin/updateuser/:id",authMiddleware,updateUser)
  .get("/admin/getordersbyuser/:id", getordersbyuser)
  .put("/admin/updateorder/:id", updateorders)
  .delete("/admin/deleteorder/:id", deleteorders)
  .get("/admin/getallorders",authMiddleware, getallorders);

export default router;
