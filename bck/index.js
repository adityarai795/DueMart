const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const CustomerRoute = require("./routes/Customer/customer.js");
const ProductRoute = require("./routes/Product/product.js");
const ShopkeeperRoute = require("./routes/Shopkeeper/shopkeeper.js");
const OrderRoute = require("./routes/Order/order.js");
const CartRoute = require("./routes/Cart/cart.js");
const TransactionRoute = require("./routes/Transaction/transaction.js");

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// API Routes
app.use("/customers", CustomerRoute);
app.use("/shopkeepers", ShopkeeperRoute);
app.use("/products", ProductRoute);
app.use("/cart", CartRoute);
app.use("/orders", OrderRoute);
app.use("/transactions", TransactionRoute);

// Health Check
app.get("/", async (req, res) => {
  res.send(" DueMart Backend API is running! nice");
});
app.get("/health", async (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});
// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT,"0.0.0.0" ,() => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
  