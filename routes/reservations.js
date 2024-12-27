const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;
    const reservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
    });
    await reservation.save();
    res.redirect("/reservation");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
