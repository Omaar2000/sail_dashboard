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
import TableComponent from "./components/Table";
import { mockDataTeam, userColumns } from "./data/mockData";
import useUserStore from "./stores/useUserStore";
import Home from "./pages/Home";
import Categories from "./pages/category/Categories";
import EditCategoryPage from "./pages/category/EditCategoryPage";
import AddCategoryPage from "./pages/category/AddCategoryPage";
import Covers from "./pages/covers/Covers";
import AddCoverPage from "./pages/covers/AddCoverPage";
import EditCoverPage from "./pages/covers/EditCoverPage";
import TripPaths from "./pages/tripPaths/TripPaths";
import EditPathPage from "./pages/tripPaths/EditPathPage";
import AddPathPage from "./pages/tripPaths/AddPathPage";
import Countries from "./pages/country/Countries";
import AddCountryPage from "./pages/country/AddCountryPage";
import EditCountryPage from "./pages/country/EditCountryPage";
import Cities from "./pages/cities/Cities";
import AddCityPage from "./pages/cities/AddCityPage";
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
  const { token, language } = useUserStore();
  useEffect(() => {
    document.body.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);
  // useEffect(() => {
  //   setLoading(true);
  //   getAllCategories();
  //   setLoading(false);
  // }, []);

  return (
    <div
    // style={{ direction: "rtl" }}
    >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/login"
              element={token ? <Navigate to="/" /> : <Login />}
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
                element={<TableComponent rows={data} columns={userColumns} />}
              />
              <Route path="covers" element={<Covers />} />
              <Route path="addcover" element={<AddCoverPage />} />
              <Route path="editcover" element={<EditCoverPage />} />
              <Route path="countries" element={<Countries />} />
              <Route path="addcountry" element={<AddCountryPage />} />
              <Route path="editcountry" element={<EditCountryPage />} />
              <Route path="cities" element={<Cities />} />
              <Route path="addcity" element={<AddCityPage />} />
              {/* <Route path="editcity" element={<EditCountryPage />} /> */}
              <Route path="categories" element={<Categories />} />
              <Route path="editcategory" element={<EditCategoryPage />} />
              <Route path="addcategory" element={<AddCategoryPage />} />
              <Route path="boatroutes" element={<TripPaths />} />
              <Route path="editpath" element={<EditPathPage />} />
              <Route path="addpath" element={<AddPathPage />} />
              {/* Add more nested routes here */}
            </Route>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
