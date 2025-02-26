import React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
} from "@mui/material";
import MenuList from "./components/Menu/MenuList";
import { MenuProvider } from "./contexts/MenuContext";
const theme = createTheme({
  palette: {
    primary: {
      main: "#ea1066",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

const App: React.FC = () => {
  return (
    <MenuProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" sx={{ mt: 4, mb: 4 }}>
          <MenuList />
        </Container>
      </ThemeProvider>
    </MenuProvider>
  );
};

export default App;
