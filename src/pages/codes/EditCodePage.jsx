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
import { ArrowBackIosNew, ArrowForwardIos, Close } from "@mui/icons-material";
import { api } from "../../network/api";
import { useTranslation } from "react-i18next";
import { getAllCountries } from "../../network/countriesServices";
import { countries } from "../../data/mockData";
import Flag from "react-world-flags";
import { toast, ToastContainer } from "react-toastify";
import { editCode } from "../../network/codesServices";

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

  const ITEMS_PER_PAGE = 11;
  const [flagPage, setFlagPage] = useState(0);
  const [codePage, setCodePage] = useState(0);
  // Calculate current page items

  const flagStart = flagPage * ITEMS_PER_PAGE;
  const flagEnd = flagStart + ITEMS_PER_PAGE;
  const codeStart = codePage * ITEMS_PER_PAGE;
  const codeEnd = codeStart + ITEMS_PER_PAGE;
  const flagItems = countries.slice(flagStart, flagEnd);
  const codeItems = countries.slice(codeStart, codeEnd);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const countryCode = {
      title_ar,
      title_en,
      flag,
      country_code: code,
    };
    try {
      setIsLoading(true);
      await editCode(row.id, countryCode, token);
      setTimeout(() => {
        navigate("/codes");
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlagPageChange = (newPage) => {
    setFlagPage(newPage);
    setFlag(null); // Reset selected country on page change
  };
  const handleFlagChange = (event) => {
    const selectedIndex = event.target.value;
    console.log(selectedIndex);
    setFlag(selectedIndex);
  };
  const handleCodePageChange = (newPage) => {
    setCodePage(newPage);
    setCode(null); // Reset selected country on page change
  };

  const handleCodeChange = (event) => {
    const selectedIndex = event.target.value;
    setCode(codeItems[selectedIndex]);
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
            <InputLabel id="selected-country-label">Country Flag</InputLabel>
            <Select
              labelId="selected-country-label"
              onChange={handleFlagChange}
              sx={{
                textTransform: "none",
              }}
              required
              label="Country Flag"
            >
              {flagItems.map((country) => (
                <MenuItem
                  value={country.code}
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                  key={country.code}
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  // marginTop: 2,
                }}
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFlagPageChange(flagPage - 1);
                  }}
                  disabled={flagPage === 0}
                >
                  <ArrowBackIosNew />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFlagPageChange(flagPage + 1);
                  }}
                  disabled={flagEnd >= countries.length}
                >
                  <ArrowForwardIos />
                </IconButton>
              </Box>
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
              onChange={handleCodeChange}
              required
              label="country code"
            >
              {codeItems.map((country) => (
                <MenuItem value={`${country.phoneCode}`}>
                  <span
                    style={{ verticalAlign: "top", marginInlineStart: "1rem" }}
                  >
                    {country.name}
                  </span>
                  <span
                    style={{ verticalAlign: "top", marginInlineStart: "1rem" }}
                  >
                    {country.phoneCode}
                  </span>
                </MenuItem>
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: 2,
                  direction: "ltr",
                }}
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCodePageChange(codePage - 1);
                  }}
                  disabled={codePage === 0}
                >
                  <ArrowBackIosNew />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCodePageChange(codePage + 1);
                  }}
                  disabled={codeEnd >= countries.length}
                >
                  <ArrowForwardIos />
                </IconButton>
              </Box>
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
