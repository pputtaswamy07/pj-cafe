const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const { user, items, total } = req.body;
    const order = new Order({ user, items, total });
    await order.save();
    res.redirect("/order");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
