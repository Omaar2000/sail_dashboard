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
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useRef, useState } from "react";
import useUserStore from "../../stores/useUserStore";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { addItem, addMultipartItem } from "../../network/network";

const AddCoverPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const location = useLocation();

  const [imageError, setImageError] = useState(false);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);
  const navigate = useNavigate();
  // const row = location.state;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { token, pinned, logout } = useUserStore();

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
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    if (!image) {
      setImageError(true);
      return;
    }

    const cover = {
      image,
      type,
    };

    try {
      setIsLoading(true);
      await addMultipartItem(token, logout, `api/admin/sliders`, cover);

      setTimeout(() => {
        navigate("/covers");
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{t("Add Cover")}</h1>

      <form onSubmit={handleFormSubmit}>
        <Box style={{ margin: "2rem" }} spacing={2} gap={"10px"}>
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
            <InputLabel id="type-label">{t("Type")}</InputLabel>

            <Select
              labelId="type-label"
              name="type"
              onChange={(e) => setType(e.target.value)}
              label={t("Type")}
              required
            >
              <MenuItem value="NONE">{t("None")}</MenuItem>
              <MenuItem value="LINK">{t("Link")}</MenuItem>
              <MenuItem value="SERVICE">{t("Service")}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          // display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginBottom="5rem"
        >
          <Box
            spacing={2}
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
            alignItems={"start"}
          >
            <input
              accept="image/png"
              id="contained-button-file"
              // multiple
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={fileRef}
              // required
            />
            {image ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  mt: 2,
                  // position: "relative",
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{
                    maxWidth: "500px",
                    maxHeight: "500px",
                    marginInlineStart: "2rem",
                  }}
                />
                <IconButton onClick={handleRemoveImage}>
                  <Close
                    sx={{
                      color: "red",
                      position: "absolute",
                      right: "-40%",
                      top: "-20%",
                      background: "white",
                      borderRadius: "50%",
                    }}
                  />
                </IconButton>
                {/* <IconButton
                    // color="secondary"
                    // sx={{ position: "absolute", right: "-30%", top: "-20%" }}
                    ></IconButton> */}
              </Box>
            ) : imageError ? (
              <Typography marginInlineStart={"2rem"} color={"red"}>
                {t("IMAGE IS REQUIRED*")}
              </Typography>
            ) : (
              <Typography marginInlineStart={"2rem"}>
                {t("No Image Selected")}
              </Typography>
            )}
            <label required htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="info"
                component="span"
                required
                style={{ marginInlineStart: "2rem" }}
              >
                {t("Upload Image")}
              </Button>
            </label>
          </Box>
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

export default AddCoverPage;
