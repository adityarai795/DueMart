const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const CustomerRoute = require("./routes/Customer/customer.js");
const ProductRoute = require("./routes/Product/product.js");
const shopkeeperRoute = require("./routes/Shopkeeper/shopkeeper.js"); 
const orderRoute = require("./routes/Order/order.js");
dotenv.config();
const cookieParser = require("cookie-parser");

const cors = require("cors");

const app = express();
app.use(cookieParser());

app.use(cors());
app.use(express.json()); // To parse JSON
app.use(express.urlencoded({ extended: true })); 
app.use("/customers", CustomerRoute);
app.use("/products", ProductRoute);
app.use("/shopkeepers", shopkeeperRoute);
app.use("/order", orderRoute);
app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
