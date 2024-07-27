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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCode } from "../../network/codesServices";

const AddCodePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [title_ar, setTitle_ar] = useState("");
  const [title_en, setTitle_en] = useState("");
  const [flag, setFlag] = useState(null);
  const [code, setCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const { token, pinned } = useUserStore();

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
      await addCode(countryCode, token);
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
  };
  const handleFlagChange = (event) => {
    const selectedIndex = event.target.value;
    console.log(selectedIndex);
    setFlag(selectedIndex);
  };
  const handleCodePageChange = (newPage) => {
    setCodePage(newPage);
  };

  const handleCodeChange = (event) => {
    const selectedIndex = event.target.value;
    setCode(selectedIndex);
  };

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{t("Add Country Code")}</h1>
      <form onSubmit={handleFormSubmit}>
        <Box style={{ margin: "2rem" }} spacing={2} gap={"10px"}>
          <TextField
            label={t("Title (English)")}
            variant="outlined"
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
      <ToastContainer position="top-center" autoClose={3000} />
    </Box>
  );
};

export default AddCodePage;
// import React, { useState } from "react";
// import {
//   Box,
//   Select,
//   MenuItem,
//   IconButton,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import Codes from "./Codes";

// const AddCountryCode = () => {

//   // Dummy data for countries
//   // const countries = [
//   //   { name: "Country 1", code: "C1" },
//   //   { name: "Country 2", code: "C2" },
//   //   { name: "Country 3", code: "C3" },
//   //   { name: "Country 4", code: "C4" },
//   //   { name: "Country 5", code: "C5" },
//   //   { name: "Country 6", code: "C6" },
//   //   { name: "Country 7", code: "C7" },
//   //   { name: "Country 8", code: "C8" },
//   //   { name: "Country 9", code: "C9" },
//   //   { name: "Country 10", code: "C10" },
//   // ];
// const ITEMS_PER_PAGE = 20;
//   const [flagPage, setFlagPage] = useState(0);
//   const [codePage, setCodePage] = useState(0);
//   const [selectedFlag, setSelectedFlag] = useState(null);
//   const [selectedCode, setSelectedCode] = useState(null);

//   // Calculate current page items
//   const flagStart = flagPage * ITEMS_PER_PAGE;
//   const flagEnd = flagStart + ITEMS_PER_PAGE;
//   const codeStart = codePage * ITEMS_PER_PAGE;
//   const codeEnd = codeStart + ITEMS_PER_PAGE;
//   const flagItems = countries.slice(flagStart, flagEnd);
//   const codeItems = countries.slice(codeStart, codeEnd);

//   const handleFlagPageChange = (newPage) => {
//     setPage(newPage);
//     setSelectedFlag(null); // Reset selected country on page change
//   };
//   const handleCodePageChange = (newPage) => {
//     setPage(newPage);
//     setSelectedCode(null); // Reset selected country on page change
//   };

//   const handleCodeChange = (event) => {
//     const selectedIndex = event.target.value;
//     setSelectedCode(codeItems[selectedIndex]);
//   };
//   const handleFlagChange = (event) => {
//     const selectedIndex = event.target.value;
//     setSelectedFlag(flagItems[selectedIndex]);
//   };

//   return (
//     <Box>
//       <FormControl fullWidth>
//         <InputLabel id="selected-country-label">Select Country</InputLabel>
//         <Select
//           labelId="selected-country-label"
//           value={
//             selectedCountry
//               ? `${selectedCountry.name} - ${selectedCountry.code}`
//               : ""
//           }
//           onChange={handleCountryChange}
//           sx={{ textTransform: "none" }}
//         >
//           {pageItems.map((country, index) => (
//             <MenuItem key={country.code} value={index}>
//               {country.name} - {country.code}
//             </MenuItem>
//           ))}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "end",
//               marginTop: 2,
//             }}
//           >
//             <IconButton
//               onClick={() => handleFlagPageChange(page - 1)}
//               disabled={page === 0}
//             >
//               <ArrowBackIosNewIcon />
//             </IconButton>
//             <IconButton
//               onClick={() => handleFlagPageChange(page + 1)}
//               disabled={end >= countries.length}
//             >
//               <ArrowForwardIosIcon />
//             </IconButton>
//           </Box>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default AddCountryCode;

{
  /* <FormControl
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
          </FormControl> */
}
