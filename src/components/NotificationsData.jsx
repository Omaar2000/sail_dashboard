import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";
import { MicNone } from "@mui/icons-material";
import { useRef, useState } from "react";

const NotificationsData = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [favIcon, setFav] = useState(null);
  const [backGround, setBackGround] = useState(null);
  const [virtualUser, setVirtualUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageError(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileRef.current) {
      fileRef.current.value = ""; // Reset the file input value
    }
  };
  return (
    <Box
      display={"grid"}
      gridTemplateColumns="repeat(12,1fr)"
      height={"100%"}
      paddingBottom={"2rem"}
      // gridAutoRows={"100%"}
      // height={"auto"}

      marginTop="1rem"
    >
      <Box gridColumn="span 6" sx={{ margin: "1rem" }}>
        <TextField
          label={t("Server Key")}
          defaultValue={"Marsol new"}
          variant="outlined"
          onChange={(e) => {
            // setTitleEN(e.target.value);
          }}
          fullWidth
          required
          sx={{
            mb: 2,
            border: "none",
            background: colors.primary[500],
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: colors.primary[100] },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.primary[100],
            },
          }}
        />
      </Box>
      <Box gridColumn="span 6" sx={{ margin: "1rem" }}>
        <TextField
          label={t("Sender ID")}
          defaultValue={"Marsol new"}
          variant="outlined"
          onChange={(e) => {
            // setTitleEN(e.target.value);
          }}
          fullWidth
          sx={{
            mb: 2,
            border: "none",
            background: colors.primary[500],
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: colors.primary[100] },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.primary[100],
            },
          }}
        />
      </Box>
      <Box
        gridColumn={"span 12"}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"end"}
        margin={"1rem"}
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
    </Box>
  );
};

export default NotificationsData;
