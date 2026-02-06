const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Register Customer
const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, address, mobileno } = req.body;

    // Validate required fields
    if (!name || !email || !password || !mobileno) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check if email already exists
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
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
      success: true,
      message: "Customer registered successfully",
      customer_id: customer._id,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Error registering customer",
      error: error.message,
    });
  }
};

// Login Customer
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    // Find customer and include password
    const customer = await Customer.findOne({ email }).select("+password");
    if (!customer) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { customer_id: customer._id, email: customer.email, role: customer.role },
      process.env.JWT_SECRET || "SECRET",
      { expiresIn: process.env.JWT_EXPIRY || "24h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
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
    res.status(500).json({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
};

// Get Customer Profile
const getProfile = async (req, res) => {
  try {
    const customerId = req.user?.customer_id;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const customer = await Customer.findById(customerId).select("-password");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer profile retrieved",
      customer,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

// Update Customer Profile
const updateProfile = async (req, res) => {
  try {
    const customerId = req.user?.customer_id;
    const { name, address, mobileno } = req.body;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (address) updateData.address = address.trim();
    if (mobileno) updateData.mobileno = mobileno.trim();

    const customer = await Customer.findByIdAndUpdate(customerId, updateData, {
      new: true,
    }).select("-password");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer profile updated successfully",
      customer,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Error logging out",
    });
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  getProfile,
  updateProfile,
  logout,
};
