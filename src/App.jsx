import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./pages/dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
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
import EditCityPage from "./pages/cities/EditCityPage";
import Codes from "./pages/codes/Codes";
import AddCodePage from "./pages/codes/AddCodePage";
import EditCodePage from "./pages/codes/EditCodePage";
import Users from "./pages/Users";
import ProviderList from "./pages/providers/ProvidersList";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Reviews from "./pages/Reviews";
import Complaints from "./pages/Complaints";
import Transactions from "./pages/Transactions";
import Payouts from "./pages/Payouts";
import Orders from "./pages/Orders";
import FeatureList from "./pages/FeatureList";
import Supervisors from "./pages/Supervisors";
import ProvidersPayouts from "./pages/ProvidersPayouts";
import PayoutsRequests from "./pages/ProvidersPayouts";
import ProvidersRequests from "./pages/ProvidersRequests";
import ProviderDetails from "./pages/providers/ProviderDetailsPage";
import Features from "./pages/features/Features";
import AddFeaturePage from "./pages/features/AddFeaturePage";
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
                path="usersDummy"
                element={<TableComponent rows={data} columns={userColumns} />}
              />
              <Route path="users" element={<Users />} />
              <Route path="providerlist" element={<ProviderList />} />
              <Route path="providerdetails" element={<ProviderDetails />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="orders" element={<Orders />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="payouts" element={<Payouts />} />
              <Route path="payoutrequests" element={<PayoutsRequests />} />
              <Route path="providersrequests" element={<ProvidersRequests />} />
              <Route path="covers" element={<Covers />} />
              <Route path="addcover" element={<AddCoverPage />} />
              <Route path="editcover" element={<EditCoverPage />} />
              <Route path="countries" element={<Countries />} />
              <Route path="addcountry" element={<AddCountryPage />} />
              <Route path="editcountry" element={<EditCountryPage />} />
              <Route path="cities" element={<Cities />} />
              <Route path="addcity" element={<AddCityPage />} />
              <Route path="editcity" element={<EditCityPage />} />
              <Route path="codes" element={<Codes />} />
              <Route path="addcode" element={<AddCodePage />} />
              <Route path="editcode" element={<EditCodePage />} />
              <Route path="categories" element={<Categories />} />
              <Route path="editcategory" element={<EditCategoryPage />} />
              <Route path="addcategory" element={<AddCategoryPage />} />
              <Route path="boatroutes" element={<TripPaths />} />
              <Route path="editpath" element={<EditPathPage />} />
              <Route path="addpath" element={<AddPathPage />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="features" element={<Features />} />
              <Route path="addfeature" element={<AddFeaturePage />} />
              <Route path="supervisors" element={<Supervisors />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
