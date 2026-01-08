const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    shopkeeper_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shopkeeper",
      required: true,
    },
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    product_description: {
      type: String,
      default: "",
    },
    product_quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    product_price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Clothing",
        "Books",
        "Home & Kitchen",
        "Sports",
        "Other",
        "Accessories",
      ],
      default: "Other",
    },
    image_url: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
