// authMiddleware.js
import jwt from "jsonwebtoken"
export const authMiddleware=(req, res, next)=>{
  const token = req.cookies.token; // needs cookie-parser middleware
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}


