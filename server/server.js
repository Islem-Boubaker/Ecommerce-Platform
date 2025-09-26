import express from "express";
import dotenv from "dotenv";
import cors from "cors";               
import db from "./config/db.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js"; 
import authRoute from "./routes/auth.routes.js"; 
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:1573",  
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true   
  
}));


db();
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/", [authRoute,userRoute,adminRoute]);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}`);
});
