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
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useUserStore from "../../stores/useUserStore";
import { Close } from "@mui/icons-material";
import { api } from "../../network/api";
import { useTranslation } from "react-i18next";
import { getAllCountries } from "../../network/countriesServices";
import { countries } from "../../data/mockData";
import Flag from "react-world-flags";
import { toast, ToastContainer } from "react-toastify";
import { editCity } from "../../network/citiesServices";

const EditCityPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const location = useLocation();
  const row = location.state;
  const [title_ar, setTitle_ar] = useState(row.title_ar);
  const [title_en, setTitle_en] = useState(row.title_en);

  const [isLoading, setIsLoading] = useState(false);

  // row.country_id = ID.toString();
  // setID(row.country_id + "");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { token, language, pinned } = useUserStore();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const city = {
      title_ar,
      title_en,
    };
    try {
      setIsLoading(true);
      await editCity(row.id, city, token);
      setTimeout(() => {
        navigate("/cities");
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCountries();
      setRows(data);
    };
    fetchData();
  }, []);
  console.log(row.id);

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{t("Edit City")}</h1>
      <form onSubmit={handleFormSubmit}>
        <Box style={{ margin: "2rem" }} spacing={2} gap={"10px"}>
          <TextField
            label={t("Title (English)")}
            variant="outlined"
            defaultValue={title_en}
            onChange={(e) => {
              setTitle_en(e.target.value);
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
          <TextField
            label={t("Title (Arabic)")}
            variant="outlined"
            defaultValue={title_ar}
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

export default EditCityPage;
