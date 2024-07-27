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
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useRef, useState } from "react";
import axios from "axios";
import useUserStore from "../../stores/useUserStore";
import { Close } from "@mui/icons-material";
import { api } from "../../network/api";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { updateCover } from "../../network/coverServices";

const EditCoverPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [type, setType] = useState(null);
  const [imageError, setImageError] = useState(false);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const row = location.state;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { token, pinned } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(image);

    const cover = {
      image: image ? image : null,
      type,
    };
    try {
      setIsLoading(true);
      await updateCover(row.id, cover, token);
      setTimeout(() => {
        navigate("/covers");
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <Box>
      <h1 style={{ margin: "2rem" }}>{t("Edit Cover")}</h1>

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
              defaultValue={row.type}
              onChange={(e) => setType(e.target.value)}
              label={t("Type")}
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
            style={{}}
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
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  mt: 2,
                  // position: "relative",
                }}
              >
                <img
                  src={row.image_url}
                  alt="Preview"
                  style={{
                    maxWidth: "500px",
                    maxHeight: "500px",
                    marginInlineStart: "2rem",
                  }}
                />
              </Box>
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

export default EditCoverPage;
