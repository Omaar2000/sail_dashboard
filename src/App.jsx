import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { themeSettings } from "./theme";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import SidebarComponent from "./components/layout/Sidebar";
import Login from "./pages/login";
import PrivateRoute from "./pages/privateRoute/PrivateRoute";
import TableComponent, { getAllCategories } from "./components/Table";
import { mockDataTeam } from "./data/mockData";
import useUserStore from "./stores/useUserStore";
import Home from "./pages/Home";
function App() {
  const [theme, colorMode] = useMode();
  const [dashboard, setDashboard] = useState(false);
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    age: "",
    access: "",
    phone: "",
  });
  const [data, setData] = useState(mockDataTeam);
  const [loading, setLoading] = useState(true);
  const { token } = useUserStore();

  // useEffect(() => {
  //   setLoading(true);
  //   getAllCategories();
  //   setLoading(false);
  // }, []);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/login"
              element={token ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="" element={<Home />} />
              <Route
                path="users"
                element={
                  <TableComponent
                    formInputs={formInputs}
                    data={data}
                    loading={loading}
                  />
                }
              />
              {/* Add more nested routes here */}
            </Route>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
