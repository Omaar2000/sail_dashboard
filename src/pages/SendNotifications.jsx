import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import { useState } from "react";

import useUserStore from "../stores/useUserStore";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { addItem } from "../network/network";

// const [title_en, setTitleEN] = useState(null);
// const [messageEN, setMessageEN] = useState(null);
const SendNotifications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [For, setFor] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { token, pinned, logout } = useUserStore();
  // const [selected, setSelected] = useState("Pending");
  const [IsOpen, setIsOpen] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const notification = {
      title,
      message,
    };
    // try {
    //   setIsLoading(true);
    //   await editCountry(row.id, country, token);
    //   setTimeout(() => {
    //     navigate("/countries");
    //   }, 500);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
    e.preventDefault();
    try {
      setIsLoading(true);
      if (For === "Providers") {
        await addItem(
          token,
          logout,
          `https://sailgloble.com/admin/notifications/send/providers`,
          notification
        );
      } else if (For === "Users") {
        await addItem(
          token,
          logout,
          `https://sailgloble.com/admin/notifications/send/customers`,
          notification
        );
      }
      setTimeout(() => {
        setIsOpen(false);
        navigate("/notifications");
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{t("Send Notifications")}</h1>
      <form onSubmit={handleFormSubmit}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
        <Box
          display="grid"
          style={{ margin: "2rem" }}
          gap={"1rem"}
          gridTemplateColumns="repeat(12,1fr)"
        >
          <Box gridColumn="span 12">
            <TextField
              label={t("Title ")}
              variant="outlined"
              onChange={(e) => {
                setTitle(e.target.value);
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
          {/* <Box gap={"10px"} gridColumn="span 6">
            <TextField
              label={t("Title (Arabic)")}
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
          </Box> */}

          <Box gridColumn="span 12">
            <TextField
              size="huge"
              label={t("Message (English)")}
              variant="outlined"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              fullWidth
              required
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
                color:
                  theme.palette.mode === "dark" ? "#fff" : colors.grey[200],
                background:
                  theme.palette.mode === "dark"
                    ? colors.primary[500]
                    : colors.grey[800],
              }}
            />
          </Box>
          <Box gridColumn="span 12">
            {/* <TextField
              size="huge"
              label={t("Message")}
              defaultValue={"Marsol new"}
              variant="outlined"
              onChange={(e) => {
                setMessageAR(e.target.value);
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
                color:
                  theme.palette.mode === "dark" ? "#fff" : colors.grey[200],
                background:
                  theme.palette.mode === "dark"
                    ? colors.primary[500]
                    : colors.grey[800],
              }}
            /> */}
          </Box>
          <Box gridColumn="span 12">
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
              <InputLabel id="code-label">{t("For")}</InputLabel>

              <Select
                labelId="code-label"
                // name="code"
                onChange={(e) => {
                  setFor(e.target.value);
                }}
                required
                label="For"
              >
                <MenuItem value={`Providers`}>
                  <span
                    style={{
                      verticalAlign: "top",
                      marginInlineStart: "1rem",
                    }}
                  >
                    {"Providers"}
                  </span>
                </MenuItem>
                <MenuItem value={`Users`}>
                  <span
                    style={{
                      verticalAlign: "top",
                      marginInlineStart: "1rem",
                    }}
                  >
                    {"Users"}
                  </span>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
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
          >
            {t("Save")}
          </Button>
        </Box>
        {/* <Dialog
          open={IsOpen}
          onClose={() => {
            // set
            setIsOpen(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ minWidth: "15rem" }} id="alert-dialog-title">
            {t("Send Notification ??")}
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            {/* <Button onClick={() => setAdminRandomIsOpen(false)} color="info">
            Cancel
          </Button> */}
        {/* <Button
              color="success"
              autoFocus
              variant="contained"
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isLoading ? t("Loading") : t("Send")}
            </Button>
          </DialogActions>
        </Dialog> */}
      </form>
      <ToastContainer position="top-center" autoClose="3000" />
    </Box>
  );
};

export default SendNotifications;

{
  /* <ButtonGroup
            variant="contained"
            aria-label="Basic button group"
            sx={{ direction: "ltr" }}
          >
            <Button
              onClick={() => setSelected("Pending")}
              style={{
                backgroundColor: selected === "Pending" ? "green" : "black",
              }}
            >
              {t("Pending")}
            </Button>
            <Button
              onClick={() => setSelected("Confirmed")}
              style={{
                backgroundColor: selected === "Confirmed" ? "green" : "black",
              }}
            >
              {t("Confirmed")}
            </Button>
            <Button
              onClick={() => setSelected("Finished")}
              style={{
                backgroundColor: selected === "Finished" ? "green" : "black",
              }}
            >
              {t("Finished")}
            </Button>
            <Button
              onClick={() => setSelected("Cancelled")}
              style={{
                backgroundColor: selected === "Cancelled" ? "green" : "black",
              }}
            >
              {t("Cancelled")}
            </Button>
          </ButtonGroup> */
}
