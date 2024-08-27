import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import usePaginationStore from "../stores/usePaginationStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setKeyword } = usePaginationStore();
  const { t } = useTranslation();
  let temp = "";
  useEffect(() => {
    setKeyword("");
  }, []);
  const handleChange = () => {
    setKeyword(temp);
    console.log("Temp: ", temp);
  };
  return (
    <>
      <Box
        display={"flex"}
        backgroundColor={colors.primary[400]}
        // borderRadius={"3px"}
        borderRadius={"100px"}
      >
        <InputBase
          sx={{ marginInlineStart: 1, flex: 1, p: 1 }}
          onChange={(e) => (temp = e.target.value)}
          placeholder={t("Search")}
        />
        <IconButton type="button" sx={{ p: 1 }} onClick={handleChange}>
          <SearchIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default SearchBar;
