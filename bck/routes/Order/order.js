const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const Transaction = require("../../models/Transaction");
const mongoose = require("mongoose");

// Create Order from Cart
router.post("/create", async (req, res) => {
  try {
    const { customer_id, delivery_address, payment_method } = req.body;

    if (!customer_id || !delivery_address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(customer_id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    // Get cart items
    const cart = await Cart.findOne({ customer_id }).populate(
      "items.product_id"
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create order
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      customer_id,
      items: cart.items.map((item) => ({
        product_id: item.product_id._id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_price: cart.total_price,
      delivery_address,
      payment_method: payment_method || "cod",
      status: "pending",
    });

    // Update product quantities
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.product_id._id, {
        $inc: { product_quantity: -item.quantity },
      });
    }

    await order.save();

    // Create transaction record
    const transaction = new Transaction({
      _id: new mongoose.Types.ObjectId(),
      order_id: order._id,
      customer_id,
      amount: order.total_price,
      payment_method: payment_method || "cod",
      status: payment_method === "cod" ? "pending" : "pending",
      transaction_id: `TXN-${order._id}`,
    });

    await transaction.save();

    // Clear cart
    await Cart.findOneAndDelete({ customer_id });

    res.status(201).json({
      message: "Order created successfully",
      order_id: order._id,
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

// Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer_id", "name email")
      .populate("items.product_id", "product_name product_price");
    res.status(200).json({
      message: "All orders retrieved",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

// Get Customer Orders
router.get("/customer/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(customer_id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const orders = await Order.find({ customer_id }).populate(
      "items.product_id",
      "product_name product_price"
    );
    res.status(200).json({
      message: "Customer orders retrieved",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get customer orders error:", error);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

// Get Order by ID
router.get("/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(order_id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(order_id)
      .populate("customer_id", "name email address mobileno")
      .populate("items.product_id", "product_name product_price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order retrieved successfully",
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);
    res
      .status(500)
      .json({ message: "Error fetching order", error: error.message });
  }
});

// Update Order Status
router.put("/update/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;
    const { status, payment_status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(order_id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    if (!status && !payment_status) {
      return res
        .status(400)
        .json({ message: "Status or payment_status required" });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (payment_status) updateData.payment_status = payment_status;

    const order = await Order.findByIdAndUpdate(order_id, updateData, {
      new: true,
    })
      .populate("customer_id", "name email")
      .populate("items.product_id", "product_name");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update transaction status if payment_status changed
    if (payment_status) {
      await Transaction.findOneAndUpdate(
        { order_id },
        { status: payment_status }
      );
    }

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order error:", error);
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
});

// Cancel Order
router.put("/cancel/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(order_id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "delivered" || order.status === "cancelled") {
      return res
        .status(400)
        .json({ message: `Cannot cancel ${order.status} order` });
    }

    // Restore product quantities
    for (let item of order.items) {
      await Product.findByIdAndUpdate(item.product_id, {
        $inc: { product_quantity: item.quantity },
      });
    }

    order.status = "cancelled";
    await order.save();

    // Update transaction
    await Transaction.findOneAndUpdate({ order_id }, { status: "failed" });

    res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res
      .status(500)
      .json({ message: "Error cancelling order", error: error.message });
  }
});

module.exports = router;

module.exports = router;
