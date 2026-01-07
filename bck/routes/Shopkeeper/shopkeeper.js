const express = require("express");
const router = express.Router();
const Shopkeeper = require("../../models/Shopkeeper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Register Shopkeeper
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, shopname, address, mobileno, description } =
      req.body;

    // Validate required fields
    if (!name || !email || !password || !shopname || !mobileno) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if email already exists
    const existingShopkeeper = await Shopkeeper.findOne({ email });
    if (existingShopkeeper) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new shopkeeper
    const shopkeeper = new Shopkeeper({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPassword,
      shopname,
      description: description || "",
      address: address || "",
      mobileno,
    });

    await shopkeeper.save();

    res.status(201).json({
      message: "Shopkeeper registered successfully",
      shopkeeper_id: shopkeeper._id,
    });
  } catch (error) {
    console.error("Register error:", error);
    res
      .status(500)
      .json({ message: "Error registering shopkeeper", error: error.message });
  }
});

// Login Shopkeeper
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find shopkeeper and include password
    const shopkeeper = await Shopkeeper.findOne({ email }).select("+password");
    if (!shopkeeper) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, shopkeeper.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        shopkeeper_id: shopkeeper._id,
        email: shopkeeper.email,
        role: shopkeeper.role,
      },
      process.env.JWT_SECRET || "SECRET",
      { expiresIn: "24h" }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({
      message: "Login successful",
      token,
      shopkeeper: {
        shopkeeper_id: shopkeeper._id,
        name: shopkeeper.name,
        shopname: shopkeeper.shopname,
        email: shopkeeper.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});

// Get Shopkeeper Profile
router.get("/profile/:shopkeeper_id", async (req, res) => {
  try {
    const { shopkeeper_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(shopkeeper_id)) {
      return res.status(400).json({ message: "Invalid shopkeeper ID" });
    }

    const shopkeeper = await Shopkeeper.findById(shopkeeper_id);
    if (!shopkeeper) {
      return res.status(404).json({ message: "Shopkeeper not found" });
    }

    res.status(200).json({
      message: "Shopkeeper profile retrieved",
      shopkeeper,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
});

// Update Shopkeeper Profile
router.put("/update/:shopkeeper_id", async (req, res) => {
  try {
    const { shopkeeper_id } = req.params;
    const { name, shopname, address, mobileno, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(shopkeeper_id)) {
      return res.status(400).json({ message: "Invalid shopkeeper ID" });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (shopname) updateData.shopname = shopname;
    if (address) updateData.address = address;
    if (mobileno) updateData.mobileno = mobileno;
    if (description) updateData.description = description;

    const shopkeeper = await Shopkeeper.findByIdAndUpdate(
      shopkeeper_id,
      updateData,
      { new: true }
    );
    if (!shopkeeper) {
      return res.status(404).json({ message: "Shopkeeper not found" });
    }

    res.status(200).json({
      message: "Shopkeeper profile updated successfully",
      shopkeeper,
    });
  } catch (error) {
    console.error("Update error:", error);
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
});

// Get All Shopkeepers
router.get("/", async (req, res) => {
  try {
    const shopkeepers = await Shopkeeper.find().select("-password");
    res.status(200).json({
      message: "All shopkeepers retrieved",
      count: shopkeepers.length,
      shopkeepers,
    });
  } catch (error) {
    console.error("Get all shopkeepers error:", error);
    res
      .status(500)
      .json({ message: "Error fetching shopkeepers", error: error.message });
  }
});

// Delete Shopkeeper (Admin only)
router.delete("/delete/:shopkeeper_id", async (req, res) => {
  try {
    const { shopkeeper_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(shopkeeper_id)) {
      return res.status(400).json({ message: "Invalid shopkeeper ID" });
    }

    const shopkeeper = await Shopkeeper.findByIdAndDelete(shopkeeper_id);
    if (!shopkeeper) {
      return res.status(404).json({ message: "Shopkeeper not found" });
    }

    res.status(200).json({
      message: "Shopkeeper deleted successfully",
      shopkeeper,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res
      .status(500)
      .json({ message: "Error deleting shopkeeper", error: error.message });
  }
});

module.exports = router;
