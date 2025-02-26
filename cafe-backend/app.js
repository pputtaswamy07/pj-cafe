const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config();

const source = process.env.MONGO_URI;
const app = express();

// Connect to MongoDB
mongoose.connect(source, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors()); // Add CORS support
app.use(bodyParser.json()); // Add JSON support
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index"));
app.use("/api/menu", require("./routes/menu")); // Add menu routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
