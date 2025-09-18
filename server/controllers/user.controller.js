import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
export const createuser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
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
    const usersloged = req.body;

    // Find user by email OR name
    const users = await User.find({
      $or: [{ email: usersloged.email }, { name: usersloged.name }],
    });

    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    let user = users.find((u) =>
      bcrypt.compareSync(usersloged.password, u.password)
    );
    if (!user) {
      return res.status(400).json({ message: "Wrong password" });
    } else {
      if (user.role === "admin") {
        res.status(200).json(user);
        console.log("admin loged");
      } else {
        res.status(200).json(user);
        console.log("client loged");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
};
