const express = require("express");
const route = express.Router();
const Customer = require("../../models/Customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const authmiddleware = require("../../middleware/auth");

// Register Customer
route.post("/register", async (req, res) => {
  try {
    const { name, email, password, address, mobileno } = req.body;

    // Validate required fields
    if (!name || !email || !password || !mobileno) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if email already exists
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new customer
    const customer = new Customer({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPassword,
      address: address || "",
      mobileno,
    });

    await customer.save();

    res.status(201).json({
      message: "Customer registered successfully",
      customer_id: customer._id,
    });
  } catch (error) {
    console.error("Register error:", error);
    res
      .status(500)
      .json({ message: "Error registering customer", error: error.message });
  }
});

// Login Customer
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find customer and include password
    const customer = await Customer.findOne({ email }).select("+password");
    if (!customer) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { customer_id: customer._id, email: customer.email, role: customer.role },
      process.env.JWT_SECRET || "SECRET",
      { expiresIn: "24h" }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({
      message: "Login successful",
      token,
      customer: {
        customer_id: customer._id,
        name: customer.name,
        email: customer.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});

// Get Customer Profile
route.get("/profile/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(customer_id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const customer = await Customer.findById(customer_id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer profile retrieved",
      customer,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
});

// Update Customer Profile
route.put("/update/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const { name, address, mobileno } = req.body;

    if (!mongoose.Types.ObjectId.isValid(customer_id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (mobileno) updateData.mobileno = mobileno;

    const customer = await Customer.findByIdAndUpdate(customer_id, updateData, {
      new: true,
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer profile updated successfully",
      customer,
    });
  } catch (error) {
    console.error("Update error:", error);
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
});

// Get All Customers (Admin only)
route.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().select("-password");
    res.status(200).json({
      message: "All customers retrieved",
      count: customers.length,
      customers,
    });
  } catch (error) {
    console.error("Get all customers error:", error);
    res
      .status(500)
      .json({ message: "Error fetching customers", error: error.message });
  }
});

route.get("/profile", authmiddleware, async (req, res) => {
  try {
    const customerId = req.user.customer_id;

    const customer = await Customer.findById(customerId).select("-password");

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer profile retrieved",
      customer,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
});

module.exports = route;
