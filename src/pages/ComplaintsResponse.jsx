import { useTheme } from "@emotion/react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import { useState } from "react";
import useUserStore from "../stores/useUserStore";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { addItem } from "../network/network";

const Respond = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const row = location.state;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const { token, pinned, logout } = useUserStore();

  const data = {
    response,
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await addItem(
        token,
        logout,
        `/admin/provider-requests/response/complaints/${row.requestTypeId}`,
        data
      );

      setTimeout(() => {
        navigate("/complaints");
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{t("Respond to Complaint")}</h1>
      <form onSubmit={handleFormSubmit}>
        <Box style={{ margin: "2rem" }} spacing={2} gap={"10px"}>
          <TextField
            size="huge"
            label={t("Message (English)")}
            defaultValue={"Marsol new"}
            variant="outlined"
            onChange={(e) => {
              setResponse(e.target.value);
            }}
            fullWidth
            multiline
            minRows={6}
            sx={{
              // mb: 2,
              border: "none",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: colors.primary[100] },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.primary[100],
              },

              borderRadius: "8px",
              color: theme.palette.mode === "dark" ? "#fff" : colors.grey[200],
              background:
                theme.palette.mode === "dark"
                  ? colors.primary[500]
                  : colors.grey[800],
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

export default Respond;
