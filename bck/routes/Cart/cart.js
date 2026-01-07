const express = require("express");
const router = express.Router();
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const mongoose = require("mongoose");

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { customer_id, product_id, quantity } = req.body;

    // Validate inputs
    if (!customer_id || !product_id || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    if (
      !mongoose.Types.ObjectId.isValid(customer_id) ||
      !mongoose.Types.ObjectId.isValid(product_id)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid customer or product ID" });
    }

    // Check if product exists and has sufficient quantity
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.product_quantity < quantity) {
      return res.status(400).json({ message: "Insufficient product quantity" });
    }

    // Find or create cart
    let cart = await Cart.findOne({ customer_id });

    if (!cart) {
      cart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        customer_id,
        items: [],
        total_price: 0,
      });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(
      (item) => item.product_id.toString() === product_id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product_id,
        quantity,
        price: product.product_price,
      });
    }

    // Calculate total price
    cart.total_price = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Item added to cart successfully",
      cart: cart.populate("items.product_id"),
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
});

// View Cart
router.get("/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(customer_id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const cart = await Cart.findOne({ customer_id }).populate(
      "items.product_id"
    );
    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: { items: [], total_price: 0 },
      });
    }

    res.status(200).json({
      message: "Cart retrieved successfully",
      cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
});

// Update cart item quantity
router.put("/update/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const { product_id, quantity } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(customer_id) ||
      !mongoose.Types.ObjectId.isValid(product_id)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid customer or product ID" });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // Check if product exists and has sufficient quantity
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.product_quantity < quantity) {
      return res.status(400).json({ message: "Insufficient product quantity" });
    }

    const cart = await Cart.findOne({ customer_id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product_id.toString() === product_id
    );
    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    item.quantity = quantity;

    // Recalculate total price
    cart.total_price = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart: await cart.populate("items.product_id"),
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
});

// Remove item from cart
router.delete("/remove/:customer_id/:product_id", async (req, res) => {
  try {
    const { customer_id, product_id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(customer_id) ||
      !mongoose.Types.ObjectId.isValid(product_id)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid customer or product ID" });
    }

    const cart = await Cart.findOne({ customer_id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product_id.toString() !== product_id
    );

    // Recalculate total price
    cart.total_price = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart successfully",
      cart: await cart.populate("items.product_id"),
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res
      .status(500)
      .json({ message: "Error removing from cart", error: error.message });
  }
});

// Clear Cart
router.delete("/clear/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(customer_id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const cart = await Cart.findOneAndDelete({ customer_id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res
      .status(500)
      .json({ message: "Error clearing cart", error: error.message });
  }
});

module.exports = router;
