import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createuser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      phone: phone || "",
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(404).json({error:error})
  }
};

// delete user controller
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser: user,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found successfully", user });
  } catch (error) {
    console.error("Error getting user:", error);
    res
      .status(500)
      .json({ message: "Error getting user", error: error.message });
  }
};
export const getUserbyname = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.find({ name: name });
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found successfully", user });
  } catch (error) {
    console.error("Error getting user by name:", error);
    res
      .status(500)
      .json({ message: "Error getting user", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.status(200).json({ message: "Users found successfully", users });
  } catch (error) {
    console.error("Error getting all users:", error);
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
};

// Update user controller
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

export const finduser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Validate required fields
    if (!password || (!email && !name)) {
      return res.status(400).json({
        message: "Password and either email or name are required",
      });
    }

    // Find user by email OR name
    const users = await User.find({
      $or: [{ email: email }, { name: name }],
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find user with matching password
    let user = users.find((u) => bcrypt.compareSync(password, u.password));

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "fallback-secret-key",
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log(`${user.role} logged in`);
    return res.status(200).json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
};
