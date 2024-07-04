import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Input,
  InputBase,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { tokens } from "../theme";
import { Label } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../stores/useUserStore";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  // const history = history();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password); // Call the login function from the store
      navigate("/dashboard"); // Redirect to the dashboard after successful login
    } catch (error) {
      // setError("Login failed. Please check your credentials and try again.");
      console.log(error, "errrrrrrrrrrrrrrrrrrrrrrrrrorr");
      // Handle login failure (show error message, clear form, etc.)
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
        >
          <h2 style={{ color: `${colors.primary[400]}` }}>Login to Continue</h2>
          <Box>
            <InputLabel
              sx={{ color: "black", fontSize: "12px", pl: "6px" }}
              htmlFor="username"
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
            onClick={handleSubmit}
          >
            Login
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
    </div>
  );
};

export default Login;
