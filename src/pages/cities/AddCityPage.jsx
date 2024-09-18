import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import useUserStore from "../../stores/useUserStore";

import { useTranslation } from "react-i18next";

import { ToastContainer } from "react-toastify";
import { addItem, getAll } from "../../network/network";

const AddCityPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  // const location = useLocation();
  const [title_ar, setTitle_ar] = useState("");
  const [title_en, setTitle_en] = useState("");
  const [ID, setID] = useState("");
  const navigate = useNavigate();
  // const row = location.state;
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { token, language, pinned, logout } = useUserStore();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const city = {
      title_ar,
      title_en,
      country_id: Number(ID),
    };
    try {
      setIsLoading(true);

      await addItem(
        token,
        logout,
        `https://sailgloble.com/admin/app_settings/cities`,
        city
      );

      setTimeout(() => {
        navigate("/cities");
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAll(
        token,
        logout,
        `https://sailgloble.com/admin/app_settings/countries`
      );

      setRows(data.data);
    };
    fetchData();
  }, []);

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{t("Add City")}</h1>
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
            <InputLabel id="type-label">{t("Country")}</InputLabel>

            <Select
              labelId="country-label"
              name="country"
              onChange={(e) => {
                setID(e.target.value);
              }}
              required
              label="Country"
            >
              {rows.map((country) => (
                <MenuItem value={`${country.id}`} key={country.id}>
                  {t(`${country.id} - `)}
                  {t(language === "ar" ? country.title_ar : country.title_en)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default AddCityPage;

// <FormControl
//             fullWidth
//             margin="normal"
//             sx={{
//               mt: 0,
//               mb: 2,
//               "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                 { borderColor: colors.primary[100] },
//               "& .MuiInputLabel-root.Mui-focused": {
//                 color: colors.primary[100],
//               },
//             }}
//           >
//             <InputLabel id="type-label">{t("Type")}</InputLabel>

//             <Select
//               labelId="type-label"
//               name="type"
//               onChange={(e) => {
//                 setType(e.target.value);
//               }}
//               required
//               label="Type"
//             >
//               {countries.map((country) => (
//                 <div key={country.code}>
//                   <MenuItem value={country.code}>
//                     <Flag
//                       code={country.code}
//                       style={{
//                         width: "50px",
//                         height: "30px",
//                         marginInlineEnd: "1rem",
//                       }}
//                     />
//                     <span>{country.name}</span>
//                   </MenuItem>
//                 </div>
//               ))}
//             </Select>
//           </FormControl>
