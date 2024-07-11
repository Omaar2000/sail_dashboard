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
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../theme";
import { useRef, useState } from "react";
import axios from "axios";
import useUserStore from "../stores/useUserStore";
import { Close } from "@mui/icons-material";
import { api } from "../network/api";

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
  // const row = location.state;

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

    updateCategory(category);
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

  const updateCategory = async (category) => {
    try {
      const res = await api.post(`api/admin/categories`, category, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
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
  //   updateCategory(row.id, category);
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
  // const updateCategory = async (id, category) => {
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
    <Box m={"2rem"}>
      <h1>Add Category</h1>
      <form onSubmit={handleFormSubmit}>
        <Box
          style={{ margin: "10px 0" }}
          spacing={2}
          display={"flex"}
          gap={"10px"}
        >
          <TextField
            label="Title (English)"
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
            label="العنوان (بالعربية)"
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
          {/* <TextField
            label="Type"
            variant="outlined"
            onChange={(e) => {}}
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
          /> */}
          <FormControl fullWidth required margin="normal">
            <InputLabel required id="type-label">
              Type
            </InputLabel>
            <Select
              labelId="type-label"
              name="type"
              onChange={(e) => setType(e.target.value)}
              label="Type"
            >
              <MenuItem value="TOUR">TOUR</MenuItem>
              <MenuItem value="FISHING">FISHING</MenuItem>
              <MenuItem value="JET_SKI">JET_SKI</MenuItem>
              <MenuItem value="BANANA">BANANA</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Box
            style={{ margin: "10px 0" }}
            spacing={2}
            display={"flex"}
            gap={"10px"}
            alignItems={"center"}
          >
            <input
              accept="image/png"
              id="contained-button-file"
              // multiple
              type="file"
              onChange={handleImageChange}
              // style={{ display: "none" }}
              ref={fileRef}
              // required
            />
            <label required htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="info"
                component="span"
                required
              >
                Upload Image
              </Button>
            </label>
            {image ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  mt: 2,
                  position: "relative",
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{
                    maxWidth: "50px",
                    maxHeight: "50px",
                    // marginRight: "10px",
                  }}
                />
                <IconButton onClick={handleRemoveImage}>
                  <Close
                    sx={{
                      color: "red",
                      position: "absolute",
                      right: "20%",
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
              <Typography
                variant="body1"
                color={"red"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ verticalAlign: "middle", mt: 2 }}
              >
                IMAGE IS REQUIRED*
              </Typography>
            ) : (
              <Typography
                variant="body1"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ verticalAlign: "middle", mt: 2 }}
              >
                No Image Selected
              </Typography>
            )}
            {/* /* Add more fields as necessary */}
          </Box>
        </Box>
        <Button type="submit" variant="contained" color="success">
          Save
        </Button>
      </form>
    </Box>
  );
};

export default AddCategoryPage;
