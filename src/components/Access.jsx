import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { Box, Typography } from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";

const AccessCell = ({ access }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      width="60%"
      m="10px"
      p="5px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor={
        access === "admin"
          ? colors.greenAccent[600]
          : access === "manager" || access === "user"
          ? colors.greenAccent[700]
          : colors.greenAccent[700]
          ? access === ""
          : "transparent"
      }
      borderRadius="4px"
    >
      {access === "admin" && <AdminPanelSettingsOutlined />}
      {access === "manager" && <SecurityOutlined />}
      {access === "user" && <LockOpenOutlined />}
      <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
        {access}
      </Typography>
    </Box>
  );
};

export default AccessCell;
