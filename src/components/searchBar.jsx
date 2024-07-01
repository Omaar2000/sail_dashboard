import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
const SearchBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box
        display={"flex"}
        backgroundColor={colors.primary[400]}
        // borderRadius={"3px"}
        borderRadius={"100px"}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default SearchBar;
