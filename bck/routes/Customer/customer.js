const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const {
  registerCustomer,
  loginCustomer,
  getProfile,
  updateProfile,
  logout,
} = require("../../controller/customerController");

// Auth Routes
router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/logout", authMiddleware, logout);

// Profile Routes (protected)
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
