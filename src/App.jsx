import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import { themeSettings } from "./theme";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
