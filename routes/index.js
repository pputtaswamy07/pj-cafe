const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/menu", (req, res) => {
  res.render("menu");
});

router.get("/order", (req, res) => {
  res.render("order");
});

router.get("/reservation", (req, res) => {
  res.render("reservation");
});

router.get("/reviews", (req, res) => {
  res.render("reviews");
});

module.exports = router;
