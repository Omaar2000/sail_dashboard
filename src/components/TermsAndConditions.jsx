import { useTheme } from "@emotion/react";
import { Box, CircularProgress, InputLabel } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { tokens } from "../theme";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

const Terms = () => {
  const [english, setEnglish] = useState("");
  const [arabic, setArabic] = useState("");
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Box sx={{ padding: "2rem" }}>
      <InputLabel sx={{ marginTop: "1rem", fontSize: "12px" }}>
        {t("Terms and Conditions in English")}
      </InputLabel>
      <ReactQuill
        theme="snow"
        value={english}
        onChange={setEnglish}
        style={{
          marginTop: "0.5rem",
          background:
            theme.palette.mode === "dark"
              ? colors.primary[200]
              : colors.grey[700],
        }}
      />
      <InputLabel sx={{ marginTop: "1rem", fontSize: "12px" }}>
        {t("Terms and Conditions in Arabic")}
      </InputLabel>
      <ReactQuill
        theme="snow"
        value={arabic}
        onChange={setArabic}
        style={{
          marginTop: "0.5rem",
          background:
            theme.palette.mode === "dark"
              ? colors.primary[200]
              : colors.grey[700],
          // borderRadius: "10px",
          // border: "none",

          // color:
          //   theme.palette.mode === "dark"
          //     ? colors.grey[300]
          //     : colors.primary[100],
        }}
      />
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

export default Terms;
