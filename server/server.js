import express from "express";
import dotenv from "dotenv";
import cors from "cors";               
import db from "./config/db.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js"; 
import authRoute from "./routes/auth.routes.js"; 
dotenv.config();
const app = express();


app.use(express.json());
app.use(cors());

db();

app.use("/", [authRoute,userRoute,adminRoute]);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}`);
});
