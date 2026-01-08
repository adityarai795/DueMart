const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
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
      enum: ["card", "online"],
      default: "card",
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    transaction_id: {
      type: String,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
