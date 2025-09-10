import express from "express";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
const router = express.Router();

async function finduser(req, res) {
    try {
        const usersloged= req.body;
    
        // Find user by email OR name
        const users = await User.find({
          $or: [{ email:usersloged.email }, { name:usersloged.name}],
        });
    
        if (!users) {
          return res.status(404).json({ message: "User not found" });
        }
    
        let user =  users.find(u => u.password === usersloged.password || bcrypt.compareSync(usersloged.password, u.password));
        if (user) {
            return user;
        } else {
          res.status(400).json({ message: "Wrong password" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during login" });
      }
}
// Login endpoint
router.post("/auth/login", (req, res)=>finduser(req, res).then(user=>{
    if (user.role === "admin") {
        res.status(200).json(user);
        console.log("admin loged")
    }else{
        res.status(200).json(user);
        console.log("client loged")
    }
    
}));
export default router;