const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const connection = require("../../config/db.js");


router.post("/createOrder", async (req, res) => {
  try {
    const { customer_id, items } = req.body;

    const orderId =uuid.v4();
    await connection.query(
      "INSERT INTO orders (order_id, customer_id, status) VALUES (?, ?, 'pending')",
      [orderId, customer_id]
    );
    for (let item of items) {
      await connection.query(
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [orderId, item.product_id, item.quantity]
      );
    await connection.query(
      "UPDATE product SET product_quantity = product_quantity - ? WHERE product_id = ? AND product_quantity >= ?",
      [item.quantity, item.product_id, item.quantity]
    );

    }
    res
      .status(201)
      .json({ message: "Order created successfully", order_id: orderId });
  } catch (error) {
    res.status(500).json({ message: error.message});
  } 
});






module.exports = router;