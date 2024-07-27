import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import SearchBar from "../searchBar";
import {
  DarkModeOutlined,
  Language,
  LightModeOutlined,
  NotificationAddOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import useUserStore from "../../stores/useUserStore";
import i18n from "../../i18n";

const Topbar = () => {
  const { logout } = useUserStore();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { toggleLanguage, language } = useUserStore();
  const changeLanguage = () => {
    toggleLanguage();
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      // alignItems="start"
      paddingX={"30px"}
      sx={{ justifyContent: "space-between" }}
    >
      <SearchBar />

      <Box display={"flex"}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
        <IconButton onClick={changeLanguage}>
          <Language />
        </IconButton>
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        <IconButton onClick={logout}>
          <PersonOutlineOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
