import React, { useState } from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Tabs,
  Tab /* 
  TextField,
  InputAdornment, */,
  Card,
  CardContent,
  Divider,
} from "@mui/material"; /* 
import SearchIcon from "@mui/icons-material/Search"; */
import MenuItem from "./MenuItem";
import { useMenu } from "../../contexts/MenuContext";

interface MenuItem {
  category: string;
  name: string;
  description: string;
}

const MenuList: React.FC = () => {
  const { menuItems, loading, error } = useMenu();
  const [category, setCategory] = useState("special"); /* 
  const [searchQuery, setSearchQuery] = useState("");
 */
  const handleCategoryChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setCategory(newValue);
  };

  /*  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }; */

  // Filter by category and search query
  const filteredItems = menuItems.filter((item: MenuItem) => {
    const matchesCategory = category === "all" || item.category === category;
    /* const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch; */
    return matchesCategory;
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

      {/*  <Box sx={{ width: "80%", maxWidth: "600px", mb: 3 }}>
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
      </Box> */}

      <Box
        sx={{ width: "100%", borderBottom: 1, borderColor: "divider", mb: 4 }}
      >
        <Tabs value={category} onChange={handleCategoryChange} centered>
          <Tab label="Today's Special" value="special" />
          <Tab label="Appetizers" value="appetizer" />
          <Tab label="Main Course" value="main" />
          <Tab label="Desserts" value="dessert" />
          <Tab label="Beverages" value="beverage" />
        </Tabs>
      </Box>

      {filteredItems.length === 0 ? (
        <Typography align="center" variant="h6">
          No items found. Try a different search or category.
        </Typography>
      ) : (
        <Grid container spacing={1}>
          {filteredItems.map((item) => (
            <Grid item xs={12} key={item._id}>
              <Card
                elevation={1}
                sx={{ width: "80%", margin: "auto", padding: 1 }}
              >
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {item.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MenuList;
