const jwt = require("jsonwebtoken");

function authmiddleware(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, "SECRET", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.user = decoded;
    console.log("✅ Token verified:", decoded);

    next();
  });
}

module.exports = authmiddleware;
