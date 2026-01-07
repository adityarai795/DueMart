const express = require("express");
const router = express.Router();
const Transaction = require("../../models/Transaction");
const mongoose = require("mongoose");

// Get All Transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("order_id", "order_id status total_price")
      .populate("customer_id", "name email");

    res.status(200).json({
      message: "All transactions retrieved",
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Get all transactions error:", error);
    res
      .status(500)
      .json({ message: "Error fetching transactions", error: error.message });
  }
});

// Get Transaction by ID
router.get("/:transaction_id", async (req, res) => {
  try {
    const { transaction_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const transaction = await Transaction.findById(transaction_id)
      .populate("order_id", "order_id status total_price")
      .populate("customer_id", "name email");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction retrieved successfully",
      transaction,
    });
  } catch (error) {
    console.error("Get transaction error:", error);
    res
      .status(500)
      .json({ message: "Error fetching transaction", error: error.message });
  }
});

// Get Transactions by Customer
router.get("/customer/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(customer_id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const transactions = await Transaction.find({ customer_id })
      .populate("order_id", "order_id status total_price")
      .populate("customer_id", "name email");

    res.status(200).json({
      message: "Customer transactions retrieved",
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Get customer transactions error:", error);
    res
      .status(500)
      .json({ message: "Error fetching transactions", error: error.message });
  }
});

// Get Transactions by Order
router.get("/order/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(order_id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const transaction = await Transaction.findOne({ order_id })
      .populate("order_id", "order_id status total_price")
      .populate("customer_id", "name email");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Order transaction retrieved",
      transaction,
    });
  } catch (error) {
    console.error("Get order transaction error:", error);
    res
      .status(500)
      .json({ message: "Error fetching transaction", error: error.message });
  }
});

// Update Transaction Status
router.put("/update/:transaction_id", async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const transaction = await Transaction.findByIdAndUpdate(
      transaction_id,
      { status },
      { new: true }
    )
      .populate("order_id", "order_id status total_price")
      .populate("customer_id", "name email");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    console.error("Update transaction error:", error);
    res
      .status(500)
      .json({ message: "Error updating transaction", error: error.message });
  }
});

module.exports = router;

module.exports = router;
