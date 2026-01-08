const Product=require("../models/Product.js")
const mongoose=require("mongoose")
module.exports.addProduct = async (req, res) => {
  try {
    const {
      // shopkeeper_id ,
      product_name,
      product_description,
      product_quantity,
      product_price,
      category,
      image_url,
    } = req.body;
    const shopkeeper_id = req.user.shopkeeper_id;
    console.log("Adding product for shopkeeper:", shopkeeper_id);
    // Validate required fields
    if (
      // !shopkeeper_id ||
      !product_name ||
      !product_quantity ||
      !product_price
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(shopkeeper_id)) {
      return res.status(400).json({ message: "Invalid shopkeeper ID" });
    }

    // Create new product
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      shopkeeper_id,
      product_name,
      product_description: product_description || "",
      product_quantity,
      product_price,
      category: category || "Other",
      image_url: image_url || "",
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};
