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
import useUserStore from "../../stores/useUserStore";
import { Close } from "@mui/icons-material";
import { api } from "../../network/api";
import { useTranslation } from "react-i18next";

const AddCategoryPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const location = useLocation();

  const [imageError, setImageError] = useState(false);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);
  const [title_ar, setTitle_ar] = useState(null);
  const [title_en, setTitle_en] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { token } = useUserStore();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(image);
    if (!image) {
      setImageError(true);
      return;
    }

    const category = {
      image,
      title_en,
      title_ar,
      type,
    };

    addCategory(category);
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

  const addCategory = async (category) => {
    try {
      const res = await api.post(`api/admin/categories`, category, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      navigate("/categories");
      return res.data;
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // console.log(row);

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // setTouched(true);

  //   if (!image) {
  //     setImageError(false);
  //     setImageError(true);
  //     return;
  //   }

  //   const category = {
  //     image,
  //     title_en: row.title_en,
  //     title_ar: row.title_ar,
  //     type: row.type,
  //   };
  //   console.log(category);
  //   // Call the function to handle the category data
  //   addCategory(row.id, category);
  // };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     setImage(file);
  //     setImageError(false);
  //   }
  // };

  // const handleRemoveImage = () => {
  //   setImage(null);
  //   if (fileRef.current) {
  //     fileRef.current.value = ""; // Reset the file input value
  //   }
  // };

  // const { token } = useUserStore();
  // console.log(token);
  // const addCategory = async (id, category) => {
  //   const res = await axios.patch(
  //     `api/admin/categories/${id}`,
  //     category, // Send the category data here
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Add the token here
  //       },
  //     }
  //   );
  //   console.log(res);
  //   return res.data;
  // };
  return (
    <Box>
      <h1 style={{ margin: "2rem" }}>{t("Add Category")}</h1>
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
            <InputLabel id="type-label">{t("Type")}</InputLabel>

            <Select
              labelId="type-label"
              name="type"
              onChange={(e) => {
                setType(e.target.value);
              }}
              required
              label="Type"
            >
              <MenuItem value="BANANA">{t("Banana Boat")}</MenuItem>
              <MenuItem value="TOUR">{t("Touring")}</MenuItem>
              <MenuItem value="FISHING">{t("Fishing")}</MenuItem>
              <MenuItem value="JET_SKI">{t("Jet Ski")}</MenuItem>
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
            // style={{ fontSize: "18px" }}
          >
            {t("Save")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddCategoryPage;
