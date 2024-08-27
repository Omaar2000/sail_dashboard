// import { useTheme } from "@emotion/react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   FormControl,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { tokens } from "../../theme";
// import { useRef, useState } from "react";
// import axios from "axios";
// import useUserStore from "../../stores/useUserStore";
// import { Close } from "@mui/icons-material";
// import { api } from "../../network/api";
// import { useTranslation } from "react-i18next";
// import { toast, ToastContainer } from "react-toastify";
// import { updateCategory } from "../../network/network";

// const EditCategoryPage = () => {
//   const { t } = useTranslation();
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const location = useLocation();

//   const [imageError, setImageError] = useState(false);
//   const fileRef = useRef(null);
//   const [image, setImage] = useState(null);
//   const row = location.state;
//   const navigate = useNavigate();

//   const { token, pinned } = useUserStore();

//   const [isLoading, setIsLoading] = useState(false);
//   const category = {
//     image: image,
//     nameEn: row.nameEn,
//     nameAr: row.nameAr,
//     type: row.type,
//   };
//   console.log(
//     "CATEGOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOORY:   ",
//     category
//   );

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     console.log(image);

//     try {
//       setIsLoading(true);
//       await updateCategory(row.id, category, token);
//       setTimeout(() => {
//         navigate("/categories");
//       }, 500);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setImageError(false);
//     }
//   };

//   const handleRemoveImage = () => {
//     setImage(null);
//     if (fileRef.current) {
//       fileRef.current.value = ""; // Reset the file input value
//     }
//   };

//   return (
//     <Box>
//       <h1 style={{ margin: "2rem" }}>{t("Edit Category")}</h1>

//       <form onSubmit={handleFormSubmit}>
//         <Box style={{ margin: "2rem" }} spacing={2} gap={"10px"}>
//           <TextField
//             label={t("Title (English)")}
//             defaultValue={row.nameEn}
//             variant="outlined"
//             onChange={(e) => {
//               row.nameEn = e.target.value;
//             }}
//             fullWidth
//             sx={{
//               mb: 2,
//               "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                 { borderColor: colors.primary[100] },
//               "& .MuiInputLabel-root.Mui-focused": {
//                 color: colors.primary[100],
//               },
//             }}
//           />
//           <TextField
//             label={t("Title (Arabic)")}
//             defaultValue={row.nameAr}
//             variant="outlined"
//             onChange={(e) => {
//               row.nameAr = e.target.value;

//               console.log(row.type);
//             }}
//             fullWidth
//             sx={{
//               mb: 2,
//               "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                 { borderColor: colors.primary[100] },
//               "& .MuiInputLabel-root.Mui-focused": {
//                 color: colors.primary[100],
//               },
//             }}
//           />

//           <FormControl
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
//               defaultValue={row.type}
//               onChange={(e) => {
//                 row.type = e.target.value;
//               }}
//               label="Type"
//             >
//               <MenuItem value="BANANA">{t("Banana Boat")}</MenuItem>
//               <MenuItem value="TOUR">{t("Touring")}</MenuItem>
//               <MenuItem value="FISHING">{t("Fishing")}</MenuItem>
//               <MenuItem value="JET_SKI">{t("Jet Ski")}</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//         <Box
//           // display={"flex"}
//           alignItems={"center"}
//           justifyContent={"space-between"}
//           marginBottom="5rem"
//         >
//           <Box
//             style={{}}
//             spacing={2}
//             display={"flex"}
//             flexDirection={"column"}
//             gap={"10px"}
//             alignItems={"start"}
//           >
//             <input
//               accept="image/png"
//               id="contained-button-file"
//               // multiple
//               type="file"
//               onChange={handleImageChange}
//               style={{ display: "none" }}
//               ref={fileRef}
//               // required
//             />
//             {image ? (
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "start",
//                   mt: 2,
//                   // position: "relative",
//                 }}
//               >
//                 <img
//                   src={URL.createObjectURL(image)}
//                   alt="Preview"
//                   style={{
//                     maxWidth: "500px",
//                     maxHeight: "500px",
//                     marginInlineStart: "2rem",
//                   }}
//                 />
//                 <IconButton onClick={handleRemoveImage}>
//                   <Close
//                     sx={{
//                       color: "red",
//                       position: "absolute",
//                       right: "-40%",
//                       top: "-20%",
//                       background: "white",
//                       borderRadius: "50%",
//                     }}
//                   />
//                 </IconButton>
//                 {/* <IconButton
//                     // color="secondary"
//                     // sx={{ position: "absolute", right: "-30%", top: "-20%" }}
//                     ></IconButton> */}
//               </Box>
//             ) : (
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "start",
//                   mt: 2,
//                   // position: "relative",
//                 }}
//               >
//                 <img
//                   src={row.imageUrl}
//                   alt="Preview"
//                   style={{
//                     maxWidth: "500px",
//                     maxHeight: "500px",
//                     marginInlineStart: "2rem",
//                   }}
//                 />
//               </Box>
//             )}
//             <label required htmlFor="contained-button-file">
//               <Button
//                 variant="contained"
//                 color="info"
//                 component="span"
//                 required
//                 style={{ marginInlineStart: "2rem" }}
//               >
//                 {t("Upload Image")}
//               </Button>
//             </label>
//           </Box>
//           {/* /* Add more fields as necessary */}
//         </Box>
//         <Box
//           sx={{
//             background: colors.primary[400],
//             position: "fixed",
//             bottom: "0",
//             width: pinned ? "calc(100% - 250px)" : "calc(100% - 80px)",
//             display: "flex",
//             justifyContent: "end",
//           }}
//         >
//           <Button
//             type="submit"
//             variant="contained"
//             color="success"
//             size="large"
//             style={{ fontSize: "15px" }}
//             disabled={isLoading} // Disable the button while loading
//             startIcon={
//               isLoading ? <CircularProgress size={20} color="inherit" /> : null
//             }
//           >
//             {isLoading ? t("Loading") : t("Save")}
//           </Button>
//         </Box>
//       </form>
//       <ToastContainer position="top-center" autoClose="3000" />
//     </Box>
//   );
// };

// export default EditCategoryPage;

import React from "react";
import { Box, Typography, Grid, Divider, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import * as XLSX from "xlsx";
import { LocationCity } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const ProviderDetails = () => {
  const location = useLocation();
  const row = location.state;
  const providerInfo = {
    name: "John Doe",
    phone: "+1234567890",
    bankAccount: "123456789012",
    id: "9876543210",
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const exportToExcel = () => {
    const data = [
      {
        Name: providerInfo.name,
        Phone: providerInfo.phone,
        "Bank Account": providerInfo.bankAccount,
        ID: providerInfo.id,
      },
      {
        Name: "OMAR",
        Phone: "0100000000",
        "Bank Account": "104554",
        ID: 10,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Provider Details");

    XLSX.writeFile(workbook, "provider_details.xlsx");
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 600,
          bgcolor: colors.primary[400],
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Provider Details
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" fontWeight="bold">
              Name:
            </Typography>
            <Typography variant="body1">{row.full_name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" fontWeight="bold">
              Phone:
            </Typography>
            <Typography variant="body1">{row.phone_number}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" fontWeight="bold">
              Bank Account:
            </Typography>
            <Typography variant="body1">{providerInfo.bankAccount}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" fontWeight="bold">
              ID:
            </Typography>
            <Typography variant="body1">{row.id}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button variant="contained" onClick={exportToExcel}>
            Export to Excel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProviderDetails;
