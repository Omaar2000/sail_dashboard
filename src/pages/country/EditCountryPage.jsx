import { useTheme } from "@emotion/react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useState } from "react";

import useUserStore from "../../stores/useUserStore";
import { api } from "../../network/api";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";

const EditCountryPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const row = location.state;
  const [title_ar, setTitleAR] = useState(row.title_ar);
  const [title_en, setTitleEN] = useState(row.title_en);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { token } = useUserStore();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const country = {
      title_ar,
      title_en,
    };

    setIsLoading(true);
    await editCountry(row.id, country);
    setIsLoading(false);
  };

  const editCountry = async (id, country) => {
    try {
      const res = await api.patch(
        `api/admin/app_settings/countries/${id}`,
        country,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);

      toast.success(t("Country Updated successfully!"));
      navigate("/countries");
      return res.data;
    } catch (error) {
      toast.error(`Error updating country`);
      console.error("Error updating country:", error);
    }
  };
  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{t("Edit Country")}</h1>
      <form onSubmit={handleFormSubmit}>
        <Box style={{ margin: "2rem" }} spacing={2} gap={"10px"}>
          <TextField
            label={t("Title (English)")}
            defaultValue={row.title_en}
            variant="outlined"
            onChange={(e) => {
              setTitleEN(e.target.value);
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
            defaultValue={row.title_ar}
            variant="outlined"
            onChange={(e) => {
              setTitleAR(e.target.value);
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

export default EditCountryPage;
