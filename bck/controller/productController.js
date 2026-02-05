const Product=require("../models/Product.js")
const mongoose=require("mongoose")
module.exports.addProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_description,
      product_quantity,
      product_price,
      category,
      image_url,
    } = req.body;
    const shopkeeper_id = req.user.shopkeeper_id;
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


module.exports.bulkAddProducts = async (req, res) => {
  try {
    const products = req.body.products;
    const shopkeeper_id = req.user.shopkeeper_id;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(shopkeeper_id)) {
      return res.status(400).json({ message: "Invalid shopkeeper ID" });
    } 
    const productsToInsert = products.map((prod) => ({
      _id: new mongoose.Types.ObjectId(),
      shopkeeper_id,  
      product_name: prod.product_name,
      product_description: prod.product_description || "",
      product_quantity: prod.product_quantity,
      product_price: prod.product_price,
      category: prod.category || "Other",
      image_url: prod.image_url || "",
    }));
    const insertedProducts = await Product.insertMany(productsToInsert);
    res.status(201).json({
      message: `${insertedProducts.length} products added successfully`,
      products: insertedProducts,
    });
  } catch (error) {
    console.error("Bulk add products error:", error);
    res
      .status(500)

      .json({ message: "Error adding products", error: error.message });
  }
};

module.exports.getAllProducts = async (req, res) => {
  try {
    const page=parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit).populate(
      "shopkeeper_id",
      "name shopname"
    );
    res.status(200).json({
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    console.error("Get all products error:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
}