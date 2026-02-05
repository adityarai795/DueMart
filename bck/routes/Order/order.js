const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const crypto = require("crypto");
const authMiddleware = require("../../middleware/auth.js");
const razorpay = require("../../utils/razorpay.js");

// CREATE ORDER - Get Razorpay Order
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const customer_id = req.user.id;
    const { delivery_address, items } = req.body;
    console.log("Create order request:", req.body);
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    if (!delivery_address) {
      return res
        .status(400)
        .json({ success: false, message: "Delivery address is required" });
    }

    // Verify stock and get prices from database
    let total_price = 0;
    const orderItems = [];

    for (const item of items) {
      orderItems.push({
        product_id: item.product_id,
        name:"Hero Cycle",
        quantity: item.quantity,
        price: 230,
      });
    }
    // Create order in database
    const order = await Order.create({
      customer_id: "69689f92a68cacba087d7e97",
      delivery_address,
      total_price,
      status: "pending",
      payment_status: "pending",
      items: orderItems,
    });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: 1000,
      currency: "INR",
      receipt: `order_${order._id}`,
    });
    res.status(201).json({
      success: true,
      orderId: order._id,
      razorpayOrder,
      message: "Order created",
    });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// VERIFY PAYMENT - Update Order & Reduce Stock
router.post("/verify-payment", authMiddleware, async (req, res) => {
  try {
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !orderId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing payment data" });
    }

    // Verify Razorpay signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    // Get order
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Update order status
    order.payment_status = "completed";
    order.status = "confirmed";
    await order.save();


    res.json({
      success: true,
      order,
      message: "Payment verified and order confirmed",
    });
  } catch (err) {
    console.error("Verify payment error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * GET CUSTOMER ORDERS
 */
router.get("/customer/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(customer_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer ID",
      });
    }

    const orders = await Order.find({ customer_id })
      .populate("items.product_id", "product_name product_price")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Customer orders retrieved",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("❌ Get customer orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
});

/**
 * GET ORDER BY ID
 */
router.get("/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(order_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(order_id)
      .populate("customer_id", "name email")
      .populate("items.product_id", "product_name product_price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Get order error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer_id", "name email")
      .populate("items.product_id", "product_name product_price")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All orders retrieved",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("❌ Get all orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
});
module.exports = router;
