import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useRef, useState } from "react";
import axios from "axios";
import useUserStore from "../../stores/useUserStore";
import { Close } from "@mui/icons-material";
import { api } from "../../network/api";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { addPath } from "../../network/pathsServices";

const AddPathPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const location = useLocation();
  const [title_ar, setTitle_ar] = useState("");
  const [title_en, setTitle_en] = useState("");
  const navigate = useNavigate();
  // const row = location.state;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const { token, pinned } = useUserStore();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const path = {
      title_ar,
      title_en,
    };
    try {
      setIsLoading(true);
      await addPath(path, token);
      setTimeout(() => {
        navigate("/boatroutes");
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{t("Add Path")}</h1>
      <form onSubmit={handleFormSubmit}>
        <Box style={{ margin: "2rem" }} spacing={2} gap={"10px"}>
          <TextField
            label={t("Title (English)")}
            variant="outlined"
            onChange={(e) => {
              setTitle_en(e.target.value);
            }}
            fullWidth
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: colors.primary[100] },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.primary[100],
              },
            }}
          />
          <TextField
            label={t("Title (Arabic)")}
            variant="outlined"
            onChange={(e) => {
              setTitle_ar(e.target.value);
            }}
            fullWidth
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: colors.primary[100] },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.primary[100],
              },
            }}
          />
        </Box>
        <Box
          // display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginBottom="5rem"
        >
          {/* /* Add more fields as necessary */}
        </Box>
        <Box
          sx={{
            background: colors.primary[400],
            position: "fixed",
            bottom: "0",
            width: pinned ? "calc(100% - 250px)" : "calc(100% - 80px)",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            style={{ fontSize: "15px" }}
            disabled={isLoading} // Disable the button while loading
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isLoading ? t("Loading") : t("Save")}
          </Button>
        </Box>
      </form>
      <ToastContainer position="top-center" autoClose="3000" />
    </Box>
  );
};

export default AddPathPage;
