const express = require("express");
const router = express.Router();
const Product = require("../../models/Product.js");
const mongoose = require("mongoose");
const { addProduct } = require("../../controller/productController.js");
const authMiddleware = require("../../middleware/auth.js");

// Add Product (by Shopkeeper)
router.post("/add", authMiddleware, addProduct);

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate(
      "shopkeeper_id",
      "name shopname"
    );
    res.status(200).json({
      message: "Products retrieved successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get all products error:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// Get Products by Category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }).populate(
      "shopkeeper_id",
      "name shopname"
    );
    res.status(200).json({
      message: `Products in ${category} retrieved`,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get by category error:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// Search Products
router.get("/search/:keyword", async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await Product.find({
      $or: [
        { product_name: { $regex: keyword, $options: "i" } },
        { product_description: { $regex: keyword, $options: "i" } },
      ],
    }).populate("shopkeeper_id", "name shopname");

    res.status(200).json({
      message: `Search results for "${keyword}"`,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Search error:", error);
    res
      .status(500)
      .json({ message: "Error searching products", error: error.message });
  }
});

// Get Product by ID
router.get("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(product_id).populate(
      "shopkeeper_id",
      "name shopname"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.error("Get product error:", error);
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

// Update Product (by Shopkeeper)
router.put("/update/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const {
      product_name,
      product_description,
      product_quantity,
      product_price,
      category,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const updateData = {};
    if (product_name) updateData.product_name = product_name;
    if (product_description !== undefined)
      updateData.product_description = product_description;
    if (product_quantity !== undefined)
      updateData.product_quantity = product_quantity;
    if (product_price) updateData.product_price = product_price;
    if (category) updateData.category = category;

    const product = await Product.findByIdAndUpdate(product_id, updateData, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

// Delete Product (by Shopkeeper)
router.delete("/delete/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

// Get Products by Shopkeeper
router.get("/shopkeeper/:shopkeeper_id", async (req, res) => {
  try {
    const { shopkeeper_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(shopkeeper_id)) {
      return res.status(400).json({ message: "Invalid shopkeeper ID" });
    }

    const products = await Product.find({ shopkeeper_id }).populate(
      "shopkeeper_id",
      "name shopname"
    );
    res.status(200).json({
      message: "Shopkeeper products retrieved",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get shopkeeper products error:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

module.exports = router;
