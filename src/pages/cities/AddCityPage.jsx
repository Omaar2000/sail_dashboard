import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
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
import { countries } from "../../data/mockData";
import Flag from "react-world-flags";

const AddCityPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const location = useLocation();
  const [title_ar, setTitle_ar] = useState("");
  const [title_en, setTitle_en] = useState("");
  const [ID, setID] = useState("");
  const navigate = useNavigate();
  // const row = location.state;
  const { t } = useTranslation();

  const { token } = useUserStore();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const city = {
      title_ar,
      title_en,
      countryId: ID,
    };

    addCity(city);
  };

  const addCity = async (city) => {
    try {
      const res = await api.post(`api/admin/app_settings/cities`, city, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      navigate("/cities");
      return res.data;
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{t("Edit Path")}</h1>
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
            width: "100%",
            display: "flex",
            // justifyContent: "end",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            style={{ fontSize: "15px" }}
          >
            {t("Save")}
          </Button>
        </Box>
      </form>
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
