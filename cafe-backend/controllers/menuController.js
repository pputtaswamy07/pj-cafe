const MenuItem = require("../models/menu");

exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ isAvailable: true });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu items" });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: "Error creating menu item" });
  }
};
