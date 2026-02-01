const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const Transaction = require("../../models/Transaction");
const mongoose = require("mongoose");
const crypto = require("crypto");

// Razorpay utility
const razorpay = require("../../utils/razorpay.js");

/**
 * STEP 1: CREATE ORDER (Checkout)
 * Frontend sends: customer_id, delivery_address
 * Backend: Create order + Create Razorpay order
 * Returns: razorpayOrder details to frontend
 */
router.post("/create", async (req, res) => {
  console.log("\n🛒 CREATE ORDER - Received order creation request");
  try {
    const { customer_id, delivery_address } = req.body;

    // ✅ VALIDATE INPUT
    if (!customer_id || !delivery_address) {
      return res.status(400).json({
        success: false,
        message: "Missing customer_id or delivery_address",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(customer_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer ID",
      });
    }

    // ✅ GET CART
    const cart = await Cart.findOne({ customer_id }).populate(
      "items.product_id",
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // ✅ CREATE ORDER IN DATABASE (Status: pending)
    const order = new Order({
      customer_id,
      items: cart.items.map((item) => ({
        product_id: item.product_id._id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_price: cart.total_price,
      delivery_address,
      payment_method: "razorpay",
      status: "pending",
      payment_status: "pending",
    });

    await order.save();
    console.log(`✅ Order created: ${order._id}`);

    // ✅ CREATE RAZORPAY ORDER
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(cart.total_price * 100), // Convert to paise
      currency: "INR",
      receipt: `order_${order._id}`,
    });

    console.log(`✅ Razorpay order created: ${razorpayOrder.id}`);

    // ✅ CREATE TRANSACTION RECORD
    const transaction = new Transaction({
      order_id: order._id,
      customer_id,
      amount: cart.total_price,
      payment_method: "razorpay",
      status: "pending",
      transaction_id: razorpayOrder.id,
    });

    await transaction.save();
    console.log(`✅ Transaction created: ${transaction._id}`);

    // ✅ RETURN RAZORPAY DETAILS TO FRONTEND
    return res.status(201).json({
      success: true,
      message: "Order created, open payment gateway",
      orderId: order._id,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    });
  } catch (error) {
    console.error("❌ Create order error:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
});

/**
 * STEP 2: VERIFY PAYMENT (After Razorpay payment)
 * Frontend sends: razorpay_order_id, razorpay_payment_id, razorpay_signature
 * Backend: Verify signature + Update order + Reduce stock + Clear cart
 * Returns: Success/Failure message
 */
router.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // ✅ VALIDATE INPUT
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    // ✅ VERIFY SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Signature mismatch");
      return res.status(400).json({
        success: false,
        message: "Invalid signature - Payment verification failed",
      });
    }

    console.log(`✅ Signature verified`);

    // ✅ UPDATE TRANSACTION TO SUCCESS
    const transaction = await Transaction.findOneAndUpdate(
      { transaction_id: razorpay_order_id },
      {
        status: "success",
        payment_id: razorpay_payment_id,
      },
      { new: true },
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    console.log(`✅ Transaction updated: ${transaction._id}`);

    // ✅ UPDATE ORDER TO CONFIRMED
    const order = await Order.findByIdAndUpdate(
      transaction.order_id,
      {
        status: "confirmed",
        payment_status: "completed",
      },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    console.log(`✅ Order confirmed: ${order._id}`);

    // ✅ REDUCE PRODUCT STOCK
    for (let item of order.items) {
      await Product.findByIdAndUpdate(
        item.product_id,
        { $inc: { product_quantity: -item.quantity } },
        { new: true },
      );
    }

    console.log(`✅ Product stock reduced`);

    // ✅ CLEAR CART
    await Cart.findOneAndDelete({ customer_id: order.customer_id });

    console.log(`✅ Cart cleared`);

    // ✅ SUCCESS RESPONSE
    return res.status(200).json({
      success: true,
      message: "Payment verified! Order confirmed",
      orderId: order._id,
      order,
    });
  } catch (err) {
    console.error("❌ Verify payment error:", err);
    return res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: err.message,
    });
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

module.exports = router;
