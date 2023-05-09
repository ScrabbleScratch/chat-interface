import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

import NavBar from "../NavBar/NavBar";
import AuthBlocker from "../AuthBlocker";
import Chat from "../Chat";

import "./App.css";

function App() {

  const theme = createTheme({
    palette: { mode: "dark" },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
          height: "100vh",
          backgroundColor: "#222831",
        }}
      >
        <Box sx={{
            height: "7.5%",
          }}
        >
          <NavBar />
        </Box>
        <Box sx={{
            height: "92.5%",
          }}
        >
          <AuthBlocker label="Enter your name" onSubmit={console.log}>
            <Chat />
          </AuthBlocker>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
