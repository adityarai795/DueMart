const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");

// Routes
const CustomerRoute = require("./routes/Customer/customer.js");
const ProductRoute = require("./routes/Product/product.js");
const ShopkeeperRoute = require("./routes/Shopkeeper/shopkeeper.js");
const OrderRoute = require("./routes/Order/order.js");
const TransactionRoute = require("./routes/Transaction/transaction.js");

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimiter);

// Connect to MongoDB
connectDB();

// API Routes
app.use("/customers", CustomerRoute);
app.use("/shopkeepers", ShopkeeperRoute);
app.use("/products", ProductRoute);
app.use("/orders", OrderRoute);
app.use("/transactions", TransactionRoute);

// Health Check
app.get("/", async (req, res) => {
  res.send("DueMart Backend API is running!");
});
app.get("/health", async (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
