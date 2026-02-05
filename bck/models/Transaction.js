const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["card", "online", "razorpay", "upi", "netbanking", "wallet"],
      default: "razorpay",
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    razorpay_order_id: {
      type: String,
      unique: true,
      sparse: true,
    },
    razorpay_payment_id: {
      type: String,
      unique: true,
      sparse: true,
    },
    payment_id: {
      type: String,
      unique: true,
      sparse: true,
    },
    transaction_id: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaction", transactionSchema);
