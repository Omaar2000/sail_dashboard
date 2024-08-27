import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  InputBase,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";
import { CheckBox, MicNone } from "@mui/icons-material";
import { useRef, useState } from "react";
import { Input, TextareaAutosize } from "@mui/base";

const EmailData = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);

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
      <Box
        gridColumn="span 6"
        sx={{ margin: "1rem" }}
        maxWidth={"100% !important"}
      >
        <TextField
          label={t("Title (English)")}
          // defaultValue={"Marsol new"}
          // variant="outlined"
          // onChange={(e) => {
          //   // setTitleEN(e.target.value);
          // }}
          fullWidth
          sx={{
            mb: 2,
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
        <TextField
          label={t("Title (English)")}
          // defaultValue={"Marsol new"}
          // variant="outlined"
          // onChange={(e) => {
          //   // setTitleEN(e.target.value);
          // }}
          fullWidth
          sx={{
            mb: 2,
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
        <TextField
          label={t("Title (English)")}
          // defaultValue={"Marsol new"}
          // variant="outlined"
          // onChange={(e) => {
          //   // setTitleEN(e.target.value);
          // }}
          fullWidth
          sx={{
            mb: 2,
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
      <Box gridColumn="span 6" sx={{ margin: "1rem" }}>
        <TextField
          size="huge"
          label={t("Title (English)")}
          defaultValue={"Marsol new"}
          variant="outlined"
          onChange={(e) => {
            // setTitleEN(e.target.value);
          }}
          fullWidth
          sx={{
            mb: 2,
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
        <TextField
          size="huge"
          label={t("Title (English)")}
          defaultValue={"Marsol new"}
          variant="outlined"
          onChange={(e) => {
            // setTitleEN(e.target.value);
          }}
          fullWidth
          sx={{
            mb: 2,
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
        <TextField
          label={t("Title (English)")}
          defaultValue={"Marsol new"}
          variant="outlined"
          onChange={(e) => {
            // setTitleEN(e.target.value);
          }}
          fullWidth
          sx={{
            // mb: 2,
            border: "none",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: colors.primary[100] },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.primary[100],
            },
            "box-sizing": "border-box",

            borderRadius: "8px",
            color: theme.palette.mode === "dark" ? "#fff" : colors.grey[200],
            background:
              theme.palette.mode === "dark"
                ? colors.primary[500]
                : colors.grey[800],
          }}
        />
      </Box>
      <Box gridColumn="span 6" sx={{ margin: "1rem" }}>
        <FormGroup>
          <Box style={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? colors.primary[500]
                          : colors.grey[800], // Change the hover background color
                    },
                    "&.Mui-checked": {
                      color: colors.primary[300], // Change the checked color
                    },
                  }}
                />
              }
              label="Label"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? colors.primary[500]
                          : colors.grey[800], // Change the hover background color
                    },
                    "&.Mui-checked": {
                      color: colors.primary[300], // Change the checked color
                    },
                  }}
                />
              }
              label="Label"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? colors.primary[500]
                          : colors.grey[800], // Change the hover background color
                    },
                    "&.Mui-checked": {
                      color: colors.primary[300], // Change the checked color
                    },
                  }}
                />
              }
              label="Label"
            />
          </Box>
        </FormGroup>
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

export default EmailData;
