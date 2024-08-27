import React from "react";
import { IconButton, Select, MenuItem, Box, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import usePaginationStore from "../stores/usePaginationStore";
import { useTranslation } from "react-i18next";

const CustomFooter = ({ handlePageSizeChange }) => {
  const { totalPages, pageSize, setPage, page } = usePaginationStore();

  // const totalPages = Math.ceil(totalRowCount / pageSize);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      justifyContent="end"
      gap="1rem"
      alignItems="center"
      padding="10px"
      bgcolor={colors.blueAccent[700]}
      sx={{ direction: "ltr" }}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="body2" style={{ marginRight: 8 }}>
          {t("Rows per page:")}
        </Typography>
        <Select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          size="small"
        >
          {[1, 5, 10, 25, 50].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box>
        <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          <ArrowForward />
        </IconButton>
      </Box>
      <Typography variant="body2">
        {t("Page ")}
        {page}
        {t(" of ")}
        {totalPages}
      </Typography>
    </Box>
  );
};

export default CustomFooter;

// Rows per page:
