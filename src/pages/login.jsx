import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  InputBase,
  InputLabel,
  Typography,
} from "@mui/material";
import { tokens } from "../theme";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../stores/useUserStore";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);

    try {
      setIsLoading(true);
      const res = await login(username, password);
      console.log("Login successful, token:", res);
      navigate("/"); // Redirect to the dashboard after successful login
    } catch (error) {
      console.error("Login failed. Error details:", error);
      // setError("Login failed. Please check your credentials and try again.");
      // Handle login failure (show error message, clear form, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          m={"100px auto"}
          borderRadius="20px"
          sx={{
            padding: "2rem 3rem",
            boxShadow:
              "0 4px 80px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
          }}
          bgcolor="#fff"
          display={"flex"}
          justifyContent={"center"}
          alignItems={""}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems={"center"}
            gap={"10px"}
            required
          >
            <h2 style={{ color: `${colors.primary[400]}` }}>
              Login to Continue
            </h2>
            <Box>
              <InputLabel
                sx={{ color: "black", fontSize: "12px", pl: "6px" }}
                htmlFor="username"
                required
              >
                Username
              </InputLabel>
              <InputBase
                id="username"
                label="Username"
                variant="outlined"
                placeholder="Username"
                required
                autoFocus
                // Set text color to black
                sx={{
                  border: `1px solid ${colors.grey[200]}`,
                  color: "black",
                  p: "6px 12px",
                  borderRadius: "10px",
                }}
                onChange={(e) => {
                  setUsername(e.target.value);
                  console.log(username, "   SFDFSGSDFG", password);
                }}
              />
            </Box>
            <Box>
              <InputLabel
                sx={{ color: "black", fontSize: "12px", pl: "6px" }}
                htmlFor="password"
              >
                Password
              </InputLabel>
              <InputBase
                id="password"
                label="Password"
                variant="outlined"
                placeholder="Password"
                // Set text color to black
                required
                type="password"
                sx={{
                  border: `1px solid ${colors.grey[200]}`,
                  color: "black",
                  p: "6px 12px",
                  borderRadius: "10px",
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: `${colors.blueAccent[600]}`,
              }}
              style={{
                color: `${colors.blueAccent[100]}`,
              }}
              disabled={isLoading} // Disable the button while loading
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
              type="submit"
            >
              {isLoading ? t("Loading") : t("Login")}
            </Button>
            <Link
              to={"/"}
              style={{ flexGrow: "0", justifySelf: "center" }}
              flexGrow="0"
              flexShrink="1"
            >
              <Typography
                sx={{ color: `${colors.primary[400]}` }}
                variant="body2"
                component="span"
              >
                Forgot password?
              </Typography>
            </Link>
          </Box>
        </Box>
      </form>
      <ToastContainer position="top-center" autoClose="3000" />
    </div>
  );
};

export default Login;

//-----------------------------------------------------------------------------------------------------------------
// const login = useUserStore((state) => state.login);
// const history = history();

// const login = async (username, password) => {
//   try {
//     const response = await fetch("https://dev.sailgloble.com/admin/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user_name: "MartinzzSam",
//         password: "Test1234@",
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//     return data; // Assuming response data contains the token
//   } catch (error) {
//     console.error("Login API call failed:", error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };
