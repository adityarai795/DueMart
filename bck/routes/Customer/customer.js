const express = require("express");
const route = express.Router();
const db = require("../../config/db");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendLoginEmail = require("../../utils/sendEmail");
const jwt = require("jsonwebtoken");

route.post("/register", async (req, res) => {
  try {
    const { name, email, password, address, mobileno } = req.body;
    const [existingUser] = await db.query(
      "SELECT * FROM customers WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const customerId = uuid.v4();
    const query =
      "INSERT INTO customers (Customer_id, name, email, password, address, mobileno) VALUES (?, ?, ?, ?, ?, ?)";
    await db.query(query, [
      customerId,
      name,
      email,
      hashedPassword,
      address,
      mobileno,
    ]);
        await sendLoginEmail(customer.Email, customer.Name);

    res.status(201).json({
      message: "Customer registered successfully",
      data: { id: customerId, name, email, hashedPassword, address, mobileno },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = "SELECT * FROM customers WHERE email = ?";
    const [rows] = await db.query(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const customer = rows[0];
    const isPasswordValid = await bcrypt.compare(password, customer.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: customer.Customer_id }, "SECRET", { expiresIn: "1h" })
res.cookie("token", token, {
  httpOnly: true, // frontend JS access nahi kar payega (security)
  secure: false, // true karna in production (https ke liye)
  sameSite: "strict",
  maxAge: 60 * 60 * 1000, // 1 hour
});
    res.status(200).json({
      message: "Customer logged in successfully",
    
        id: customer.Customer_id,
        name: customer.Name,
        email: customer.Email,
        token:token,
     
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = route;
