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

const EditCodePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [rows, setRows] = useState([]);
  const location = useLocation();
  const row = location.state;
  const [title_ar, setTitle_ar] = useState(row.title_ar);
  const [title_en, setTitle_en] = useState(row.title_en);
  const [flag, setFlag] = useState(row.flag);
  const [code, setCode] = useState(row.country_code);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  console.log(code);
  const { token, pinned } = useUserStore();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const countryCode = {
      title_ar,
      title_en,
      flag,
      country_code: code,
    };

    setIsLoading(true);
    await editCode(row.id, countryCode);
    setIsLoading(false);
  };

  const editCode = async (id, countryCode) => {
    try {
      const res = await api.patch(
        `api/admin/app_settings/country_code/${id}`,
        countryCode,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      toast.success(t("Country code added successfully!"));
      navigate("/codes");
      return res.data;
    } catch (error) {
      toast.error(`Error editing country code`);
      console.error("Error editing code:", error);
    }
  };

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{t("Edit Country Code")}</h1>
      <form onSubmit={handleFormSubmit}>
        <Box style={{ margin: "2rem" }} spacing={2} gap={"10px"}>
          <TextField
            label={t("Title (English)")}
            variant="outlined"
            onChange={(e) => {
              setTitle_en(e.target.value);
            }}
            defaultValue={row.title_en}
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
            defaultValue={row.title_ar}
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
          <FormControl
            fullWidth
            margin="normal"
            sx={{
              mt: 0,
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: colors.primary[100] },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.primary[100],
              },
            }}
          >
            <InputLabel id="flag-label">{t("Flag")}</InputLabel>

            <Select
              labelId="flag-label"
              name="flag"
              onChange={(e) => {
                setFlag(e.target.value);
              }}
              defaultValue={flag}
              required
              label="Flag"
            >
              {countries.map((country) => (
                <MenuItem
                  value={country.code}
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <Flag
                    code={country.code}
                    style={{
                      width: "40px",
                      height: "25px",
                      marginInlineEnd: "1rem",
                    }}
                  />
                  <span style={{ verticalAlign: "top" }}>{country.name}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            sx={{
              mt: 0,
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: colors.primary[100] },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.primary[100],
              },
            }}
          >
            <InputLabel id="code-label">{t("Country Code")}</InputLabel>

            <Select
              labelId="code-label"
              name="code"
              defaultValue={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              required
              label="country code"
            >
              {countries.map((country) => (
                <MenuItem value={`${country.phoneCode}`}>
                  <span
                    style={{
                      marginInlineEnd: "1rem",
                    }}
                  >
                    {country.phoneCode}
                  </span>
                  <span style={{ verticalAlign: "top" }}>{country.name}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
      <ToastContainer position="top-center" autoClose={2000} />
    </Box>
  );
};

export default EditCodePage;
