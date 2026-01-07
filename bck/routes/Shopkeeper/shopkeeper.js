const express = require("express")
const router = express.Router()
const db = require("../../config/db.js")
const uuid = require("uuid");
const bcrypt=require("bcrypt");

router.post("/addShopkeeper", async (req, res) => {

  try {
    const { s_name, shop_name, s_mobile ,s_email,password } = req.body;
    const shopkeeperId = uuid.v4(); 
    // Validate required fields
    if (!s_name || !shop_name || !s_mobile || !s_email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 5);

    // Insert into DB
    const [result] = await db.query(
      `INSERT INTO shopkeeper ( s_id,s_name, shop_name, s_mobile,s_email,password)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [shopkeeperId,s_name, shop_name, s_mobile,s_email,hashedPassword]
    );
    
    res.status(201).json({
      message: "Shopkeeper registered successfully",
      shopkeeper: {
        id: shopkeeperId,
        s_name,
        shop_name,
        s_mobile,
        s_email,
        password: hashedPassword
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/login", async (req, res) => {

  try {
    const { s_email, password } = req.body;

    if (!s_email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [rows] = await db.query(
      `SELECT * FROM shopkeeper WHERE s_email = ?`,
      [s_email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const shopkeeper = rows[0];

    const isMatch = await bcrypt.compare(password, shopkeeper.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      shopkeeper: {
        id: shopkeeper.s_id,
        s_name: shopkeeper.s_name,
        s_email: shopkeeper.s_email,
        s_phone: shopkeeper.s_phone,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/showallshopkeeper", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM shopkeeper");
    res.status(200).json({
      message: "Shopkeepers retrieved successfully",
      shopkeepers: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/deleteShopkeeper/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM shopkeeper WHERE s_id = ?", [id]);
    res.status(200).json({ message: "Shopkeeper deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;