import express from "express";
import multer from "multer";
import fs from "fs";
import { addProduct ,deleteproduct ,updateproduct, getallproducts, getproductById, getproductsByCategory } from "../controllers/product.controller.js";
import { deleteUser, getUserById, getUserbyname, getAllUsers ,createuser} from "../controllers/user.controller.js";
import { getordersbyuser,getallorders } from "../controllers/Orders.controller.js";
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
router.post("/admin/addproduct", upload.array("images"), addProduct)
  .delete("/admin/deleteuser/:id", deleteUser)
  .get("/admin/getallproducts", getallproducts)
  .get("/admin/getproduct/:id", getproductById)
  .get("/admin/getproductByCategory/:category", getproductsByCategory)
  .put("/admin/updateproduct/:id", updateproduct)
  .delete("/admin/deleteproduct/:id", deleteproduct)
  .get("/admin/getuser/:id", getUserById)
  .get("/admin/getuser/:name", getUserbyname)
  .get("/admin/getallusers", getAllUsers)
  .post("/admin/createuser", createuser)
  .delete("/admin/deleteuser/:id", deleteUser)
  .put("/admin/updateuser/:id", updateUser)
  .get("/admin/getordersbyuser/:id", getordersbyuser)
  .put("/admin/updateorder/:id", updateorder)
  .delete("/admin/deleteorder/:id", deleteorder)
  .get("/admin/getallorders", getallorders);

export default router;
