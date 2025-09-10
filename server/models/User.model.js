import mongoose
    from "mongoose";    
import bcrypt from "bcryptjs";
let User = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});
User.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);   
    next();
  });
  
export default mongoose.model("User", User);