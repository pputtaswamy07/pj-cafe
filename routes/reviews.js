const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.post("/", async (req, res) => {
  try {
    const { user, rating, comment } = req.body;
    const review = new Review({ user, rating, comment });
    await review.save();
    res.redirect("/reviews");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
