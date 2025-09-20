import express from "express";
import { finduser,createuser } from "../controllers/user.controller.js";
const router = express.Router();

// Login endpoint
router
  .post("/auth/login", finduser)
  .post("/user/register", createuser);

export default router;


