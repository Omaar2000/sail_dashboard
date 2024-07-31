import React from "react";
import { IconButton, Select, MenuItem, Box, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import usePaginationStore from "../stores/usePaginationStore";

const CustomFooter = ({ handlePageSizeChange }) => {
  const { totalPages, pageSize, setPage, page } = usePaginationStore();

  // const totalPages = Math.ceil(totalRowCount / pageSize);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="flex"
      justifyContent="end"
      gap="1rem"
      alignItems="center"
      padding="10px"
      bgcolor={colors.blueAccent[700]}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="body2" style={{ marginRight: 8 }}>
          Rows per page:
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
        Page {page} of {totalPages}
      </Typography>
    </Box>
  );
};

export default CustomFooter;
