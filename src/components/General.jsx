import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";
import { Close, MicNone } from "@mui/icons-material";
import { useRef, useState } from "react";

const General = () => {
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
      // gridAutoRows={"100%"}
      // height={"auto"}
      height={"100%"}
      paddingBottom={"2rem"}
      marginTop="1rem"
    >
      <Box gridColumn="span 6" sx={{ margin: "1rem" }}>
        <TextField
          label={t("Title (English)")}
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
        <TextField
          label={t("Title (English)")}
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
          label={t("Title (English)")}
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
        <TextField
          label={t("Title (English)")}
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
      <Box
        gridColumn="span 12"
        display={"flex"}
        gap="1rem"
        justifyContent={"center"}
        marginInlineEnd={"2rem"}
        alignItems={"center"}
      >
        {/* <button
          variant="info"
          style={{
            backgroundImage: "url('../../public/jetski.png')",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            "&:hover": {
              background: "#fff",
            },
          }}
          >
          Upload
          </button> */}
        <Box>
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
                  maxWidth: "130px",
                  maxHeight: "130px",
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
                src={"../../public/jetski.png"}
                alt="Preview"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  marginInlineStart: "2rem",
                  marginBottom: "1rem",
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
          {!image && (
            <Typography marginInlineStart={"2rem"}>
              {t("No Image Selected")}
            </Typography>
          )}
        </Box>

        <Box>
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
                  maxWidth: "130px",
                  maxHeight: "130px",
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
                src={"../../public/jetski.png"}
                alt="Preview"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  marginInlineStart: "2rem",
                  marginBottom: "1rem",
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
          {!image && (
            <Typography marginInlineStart={"2rem"}>
              {t("No Image Selected")}
            </Typography>
          )}
        </Box>

        <Box>
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
                  maxWidth: "130px",
                  maxHeight: "130px",
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
                src={"../../public/jetski.png"}
                alt="Preview"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  marginInlineStart: "2rem",
                  marginBottom: "1rem",
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
          {!image && (
            <Typography marginInlineStart={"2rem"}>
              {t("No Image Selected")}
            </Typography>
          )}
        </Box>
        <Box>
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
                  maxWidth: "130px",
                  maxHeight: "130px",
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
                src={"../../public/jetski.png"}
                alt="Preview"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  marginInlineStart: "2rem",
                  marginBottom: "1rem",
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
          {!image && (
            <Typography marginInlineStart={"2rem"}>
              {t("No Image Selected")}
            </Typography>
          )}
        </Box>
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

export default General;
