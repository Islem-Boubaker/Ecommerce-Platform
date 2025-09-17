import User from "../models/User.model.js";
export const createuser=async(req,res)=>{
     try {
       const newUser = new User(req.body);
       await newUser.save();
       res.send("User registered successfully");
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Server error during registration" });
     }
   }
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
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

export const getUserById =(id) => {
    User.findById(id)
    .then((user)=>{
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({message:"User found successfully",user})
    })
}
export const getUserbyname = (name) => {
    User.find({name:name})
    .then((user)=>{
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({message:"User found successfully",user})
    })
}

export const getAllUsers = (req, res) => {
    User.find()
    .then((users)=>{
        if(!users){
            return res.status(404).json({message:"Users not found"})
        }
        res.status(200).json({message:"Users found successfully",users})
    })
}



export const  finduser=async(req, res)=>{
  try {
      const usersloged= req.body;
  
      // Find user by email OR name
      const users = await User.find({
        $or: [{ email:usersloged.email }, { name:usersloged.name}],
      });
  
      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }
  
      let user =  users.find(bcrypt.compareSync(usersloged.password, u.password));
      if (!user) {
          return res.status(400).json({ message: "Wrong password" });
      } else {
        if (user.role === "admin") {
          res.status(200).json(user);
          console.log("admin loged")
      }else{
          res.status(200).json(user);
          console.log("client loged")
      }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error during login" });
     
      
    }
}