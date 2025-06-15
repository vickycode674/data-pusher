// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded; // contains user ID and role
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
    console.log("here is the user role============",req.user.role)
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin
};
