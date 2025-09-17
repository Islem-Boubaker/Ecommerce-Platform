import express from "express";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { finduser,createuser } from "../controllers/user.controller.js";
const router = express.Router();

// Login endpoint
router
  .post("/auth/login", finduser)
  .post("/user/register", createuser);

export default router;