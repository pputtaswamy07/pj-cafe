import React, { useState } from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "./MenuItem";
import { useMenu } from "../../contexts/MenuContext";

interface MenuItem {
  category: string;
  name: string;
  description: string;
}

const MenuList: React.FC = () => {
  const { menuItems, loading, error } = useMenu();
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setCategory(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter by category and search query
  const filteredItems = menuItems.filter((item: MenuItem) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3, // Adds padding
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        textAlign="center"
        sx={{
          color: "primary.main",
        }}
      >
        Our Menu
      </Typography>

      <Box sx={{ width: "80%", maxWidth: "600px", mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search our menu..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{ width: "100%", borderBottom: 1, borderColor: "divider", mb: 4 }}
      >
        <Tabs value={category} onChange={handleCategoryChange} centered>
          <Tab label="All" value="all" />
          <Tab label="Appetizers" value="appetizer" />
          <Tab label="Main Course" value="main" />
          <Tab label="Desserts" value="dessert" />
          <Tab label="Beverages" value="beverage" />
        </Tabs>
      </Box>

      {filteredItems.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6">No menu items found</Typography>
        </Box>
      ) : (
        <Grid container spacing={4} sx={{ width: "90%" }}>
          {filteredItems.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4}>
              <MenuItem item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MenuList;
