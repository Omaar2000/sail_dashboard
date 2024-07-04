import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import { themeSettings } from "./theme";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import SidebarComponent from "./components/layout/Sidebar";
import Login from "./pages/login";
import PrivateRoute from "./pages/privateRoute/PrivateRoute";
function App() {
  const [theme, colorMode] = useMode();
  const [dashboard, setDashboard] = useState(false);
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
