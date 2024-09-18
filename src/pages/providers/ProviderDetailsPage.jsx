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

// import React, { useEffect, useState } from "react";
// import { Box, Typography, Grid, Divider, Button } from "@mui/material";
// import { useTheme } from "@emotion/react";
// import { tokens } from "../../theme";
// import * as XLSX from "xlsx";
// import { LocationCity } from "@mui/icons-material";
// import { useLocation } from "react-router-dom";
// import { getAll } from "../../network/network";
// import useUserStore from "../../stores/useUserStore";
// import Control from "../../components/Control";

// const ProviderDetails = () => {
//   const location = useLocation();
//   const row = location.state;
//   // const theme = useTheme();
//   // const colors = tokens(theme.palette.mode);

//   const [providerInfo, setProviderInfo] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const { token, logout } = useUserStore();

//   useEffect(() => {
//     const fetchProviderDetails = async () => {
//       try {
//         setLoading(true);

//         const data = await getAll(
//           token,
//           logout,
//           `https://sailgloble.com/admin/providers/${row?.requestTypeId}`
//         );

//         setProviderInfo(data); // Assuming the API returns data in a structure you need

//         console.log(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error getting Provider:", error);
//         setLoading(false);
//       }
//     };

//     if (!row?.full_name) {
//       fetchProviderDetails();
//     } else {
//       console.error("Provider ID is missing in location state.");
//     }
//   }, [row?.id]);
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const exportToExcel = () => {
//     const data = [
//       {
//         Name: providerInfo.name,
//         Phone: providerInfo.phone,
//         "Bank Account": providerInfo.bankAccount,
//         ID: providerInfo.id,
//       },
//       {
//         Name: "OMAR",
//         Phone: "0100000000",
//         "Bank Account": "104554",
//         ID: 10,
//       },
//     ];

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Provider Details");

//     XLSX.writeFile(workbook, "provider_details.xlsx");
//   };

//   console.log(providerInfo);
//   return (
//     <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
//       <Box
//         sx={{
//           p: 4,
//           width: "100%",
//           maxWidth: 600,
//           bgcolor: colors.primary[400],
//           borderRadius: 2,
//           boxShadow: 3,
//         }}
//       >
//         <Typography variant="h5" gutterBottom align="center">
//           Provider Details
//         </Typography>
//         <Divider sx={{ mb: 3 }} />
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="body1" fontWeight="bold">
//               Name:
//             </Typography>
//             <Typography variant="body1">
//               {providerInfo?.full_name || row.full_name}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="body1" fontWeight="bold">
//               Phone:
//             </Typography>
//             <Typography variant="body1">
//               {providerInfo?.phone_number || row.phone_number}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="body1" fontWeight="bold">
//               Bank Name:
//             </Typography>
//             <Typography variant="body1">
//               {providerInfo?.bank_name || row.bank_name}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="body1" fontWeight="bold">
//               Bank Account Number:
//             </Typography>
//             <Typography variant="body1">
//               {providerInfo?.bank_account_number || row.bank_account_number}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="body1" fontWeight="bold">
//               IBAN Number:
//             </Typography>
//             <Typography variant="body1">
//               {providerInfo?.iban_number || row.iban_number}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="body1" fontWeight="bold">
//               Email:
//             </Typography>
//             <Typography variant="body1">
//               {providerInfo?.email || row.email}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="body1" fontWeight="bold">
//               Nationality:
//             </Typography>
//             <Typography variant="body1">
//               {providerInfo?.nationality || row.nationality}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="body1" fontWeight="bold">
//               Country Code:
//             </Typography>
//             <Typography variant="body1">
//               {providerInfo?.country_code_Id || row.country_code_Id}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="body1" fontWeight="bold">
//               Profile Image:
//             </Typography>
//             <Typography variant="body1">
//               <img
//                 src={providerInfo?.image_url || row.image_url}
//                 alt="Provider"
//                 style={{ maxWidth: "100%", height: "auto" }}
//               />
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="body1" fontWeight="bold">
//               Created At:
//             </Typography>
//             <Typography variant="body1">
//               {providerInfo?.created_at || row.created_at}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             {/* <Typography variant="body1" fontWeight="bold">
//               Is Verified:
//             </Typography>
//             <Typography variant="body1">
//               {providerInfo?.is_verified ? "Yes" : "No"}
//             </Typography> */}
//           </Grid>
//         </Grid>

//         <Box sx={{ mt: 4, textAlign: "center" }}>
//           {providerInfo?.full_name && (
//             <Control
//               endpoint={`https://sailgloble.com/admin/provider-requests/approve/account/${providerInfo.requestTypeId}`}
//               row={row}
//             />
//           )}
//           {/* <Button variant="contained" onClick={exportToExcel}>
//             Export to Excel
//           </Button> */}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ProviderDetails;

// import React from "react";
// import { Box, Typography, Grid, Divider, Avatar } from "@mui/material";
// import { useTheme } from "@emotion/react";
// import { tokens } from "../../theme";

// const ProviderDetails = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   // Mock data for testing
//   const mockProviderInfo = {
//     full_name: "John Doe",
//     phone_number: "+1 234 567 8900",
//     bank_name: "Global Bank",
//     bank_account_number: "1234567890",
//     iban_number: "GB29NWBK60161331926819",
//     email: "john.doe@example.com",
//     nationality: "United States",
//     country_code_Id: "US",
//     image_url: "https://example.com/profile.jpg",
//     created_at: "2023-05-20T10:30:00Z",
//   };

//   return (
//     <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
//       <Box
//         sx={{
//           p: 4,
//           width: "100%",
//           maxWidth: 800,
//           bgcolor: colors.primary[400],
//           borderRadius: 4,
//           boxShadow: 3,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//           <Avatar
//             src={mockProviderInfo.image_url}
//             sx={{ width: 80, height: 80, mr: 2 }}
//           />
//           <Typography variant="h4" fontWeight="bold">
//             {mockProviderInfo.full_name}
//           </Typography>
//         </Box>
//         <Divider sx={{ mb: 3 }} />
//         <Grid container spacing={3}>
//           {Object.entries(mockProviderInfo).map(([key, value]) => (
//             <Grid item xs={12} sm={6} key={key}>
//               <Typography
//                 variant="subtitle1"
//                 fontWeight="bold"
//                 color={colors.greenAccent[400]}
//               >
//                 {key.replace(/_/g, " ").toUpperCase()}:
//               </Typography>
//               <Typography variant="body1">
//                 {key === "image_url" ? (
//                   <img
//                     src={value}
//                     alt="Provider"
//                     style={{
//                       maxWidth: "100%",
//                       height: "auto",
//                       borderRadius: 8,
//                     }}
//                   />
//                 ) : (
//                   value
//                 )}
//               </Typography>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default ProviderDetails;
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Avatar,
  Paper,
  Chip,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FlagIcon from "@mui/icons-material/Flag";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Ban from "../../components/Ban";
import { useLocation } from "react-router-dom";

const ProviderDetails = () => {
  const location = useLocation();
  const row = location.state;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Mock data for testing
  const mockProviderInfo = {
    full_name: "John Doe",
    phone_number: "+1 234 567 8900",
    bank_name: "Global Bank",
    bank_account_number: "1234567890",
    iban_number: "GB29NWBK60161331926819",
    email: "john.doe@example.com",
    nationality: "United States",
    country_code_Id: "US",
    image_url: "https://example.com/profile.jpg",
    created_at: "2023-05-20T10:30:00Z",
  };

  const InfoItem = ({ icon, label, value }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      {icon}
      <Box sx={{ ml: 2 }}>
        <Typography variant="body2" color={colors.grey[100]}>
          {label}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 900,
          bgcolor: colors.primary[400],
          borderRadius: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar
            src={mockProviderInfo.image_url}
            sx={{ width: 100, height: 100, mr: 3 }}
          />
          <Box>
            <Typography variant="h3" fontWeight="bold" color={colors.grey[100]}>
              {mockProviderInfo.full_name}
            </Typography>
            <Chip
              label={mockProviderInfo.nationality}
              icon={<FlagIcon />}
              sx={{ mt: 1, bgcolor: colors.greenAccent[600] }}
            />
          </Box>
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <InfoItem
              icon={<EmailIcon sx={{ color: colors.greenAccent[500] }} />}
              label="Email"
              value={mockProviderInfo.email}
            />
            <InfoItem
              icon={<PhoneIcon sx={{ color: colors.greenAccent[500] }} />}
              label="Phone"
              value={mockProviderInfo.phone_number}
            />
            <InfoItem
              icon={
                <CalendarTodayIcon sx={{ color: colors.greenAccent[500] }} />
              }
              label="Joined"
              value={new Date(mockProviderInfo.created_at).toLocaleDateString()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoItem
              icon={
                <AccountBalanceIcon sx={{ color: colors.greenAccent[500] }} />
              }
              label="Bank Name"
              value={mockProviderInfo.bank_name}
            />
            <InfoItem
              icon={<CreditCardIcon sx={{ color: colors.greenAccent[500] }} />}
              label="Bank Account Number"
              value={mockProviderInfo.bank_account_number}
            />
            <InfoItem
              icon={<CreditCardIcon sx={{ color: colors.greenAccent[500] }} />}
              label="IBAN Number"
              value={mockProviderInfo.iban_number}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color={colors.grey[100]}
            gutterBottom
          >
            Additional Information
          </Typography>
          <Typography variant="body1">
            Country Code: {mockProviderInfo.country_code_Id}
          </Typography>
        </Box>
      </Paper>
      <Ban
        banEndpoint={`https://sailgloble.com/admin/clients/ban/${row.id}`}
        unbanEndpoint={`https://sailgloble.com/admin/clients/unban/${row.id}`}
        // row={row}
      />
    </Box>
  );
};

export default ProviderDetails;
