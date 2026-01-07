const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const db = require("../../config/db.js");

router.post("/add", async (req, res) => {
  try {
    const {
      shopkeeper_id,
      product_name,
      product_description,
      product_quantity,
      product_price,
    } = req.body;

    if (
      !shopkeeper_id ||
      !product_name ||
      !product_quantity ||
      !product_price
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const product_id = uuid.v4();

    await db.query(
      `INSERT INTO product 
       (product_id, shopkeeper_id, product_name, product_description, product_quantity, product_price)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        product_id,
        shopkeeper_id,
        product_name,
        product_description || null,
        product_quantity,
        product_price
      ]
    );
    res.status(201).json({
      message: "Product added successfully",
      product: {
        product_id,
        shopkeeper_id,
        product_name,
        product_description,
        product_quantity,
        product_price
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example route
router.get("/showalldata", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM product ORDER BY created_at DESC"
    );
    res.status(200).json({
      message: "Products retrieved successfully",
      products: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
try {
    const { id } = req.params;
    await db.query("DELETE FROM product WHERE product_id = ?", [id]);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/update/:id", async (req, res) => {
try {
  const { id } = req.params;
  const [rows] = await db.query("SELECT * FROM product WHERE product_id = ?", [id]);
  const row = rows[0];
  if (!row) {
    return res.status(404).json({ error: "Product not found" });
  }

  const {
    product_name,
    product_description,
    product_quantity,
    product_price,
  } = req.body;

  await db.query(
    `UPDATE product SET
       product_name = ?,
       product_description = ?,
       product_quantity = ?,
       product_price = ?
     WHERE product_id = ?`,
    [
      product_name || row.product_name,
      product_description || row.product_description,
      product_quantity || row.product_quantity,
      product_price || row.product_price,
      id,
    ]
  );

  res.status(200).json({ product: { ...row, ...req.body } });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});



module.exports = router;
