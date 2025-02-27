const mongoose = require("mongoose");
const MenuItem = require("../models/MenuItem");
require("dotenv").config();

// Sample menu items data
const menuItems = [
  // Appetizers
  {
    name: "Bruschetta",
    description: "Toasted bread topped with tomatoes, garlic, and fresh basil",
    price: 6.95,
    category: "appetizer",
  },
  //main
  {
    name: "Avocado Toast",
    description:
      "Sourdough toast topped with mashed avocado, cherry tomatoes, and microgreens",
    price: 8.95,
    category: "main",
  },
  {
    name: "Calamari",
    description: "Crispy fried calamari served with marinara sauce",
    price: 8.95,
    category: "main",
  },

  //today's special
  {
    name: "Chocolate Croissant",
    description: "Buttery flaky pastry filled with rich chocolate",
    price: 3.75,
    category: "special",
  },

  //beverage
  {
    name: "Chai Latte",
    description: "Spiced tea concentrate with steamed milk",
    price: 4.25,
    category: "beverage",
  },
  //dessert

  {
    name: "Tiramisu",
    description:
      "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
    price: 4.25,
    category: "dessert",
  },
];

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    try {
      // Delete existing menu items first (optional)
      await MenuItem.deleteMany({});
      console.log("Previous menu items deleted");

      // Insert the new menu items
      const result = await MenuItem.insertMany(menuItems);
      console.log(`${result.length} menu items inserted successfully`);

      // Close the connection
      mongoose.connection.close();
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
