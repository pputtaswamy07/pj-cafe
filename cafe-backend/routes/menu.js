const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem");

// Define your menu routes
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Export the router
module.exports = router;
