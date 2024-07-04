import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Item = ({
  icon,
  to,
  selected,
  setSelected,
  hovered,
  setHovered,
  title,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <MenuItem
        active={selected === title}
        icon={icon}
        onClick={() => {
          setSelected(title);
        }}
        onMouseEnter={() => setHovered(title)}
        onMouseLeave={() => setHovered(null)}
        style={{
          textAlign: "center",
          color: colors.grey[100],
          background: hovered === title ? "red" : "transparent",
        }}
      >
        {title}
      </MenuItem>
    </Link>
  );
};

const SidebarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [Selected, setSelected] = useState("Dashboard");
  const [hovered, setHovered] = useState(null);
  return (
    <Sidebar
      collapsed={isCollapsed}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      style={{
        // position: "absolute",
        // display: "sticky",
        // left: "0",

        height: "100vh",
        border: "none",
      }}
      backgroundColor={colors.primary[400]}
      // transitionDuration={"3000"}
    >
      <Menu>
        <Box
          display="flex"
          pt="20px"
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          {/* <MenuOutlinedIcon /> */}
          {!isCollapsed ? (
            <Box display="flex" flexDirection={"column"} alignItems={"center"}>
              <img
                width="60px"
                height="60px"
                src="../../../public/vite.svg"
                alt="profile picture"
                style={{ borderRadius: "50%" }}
              />
              <Typography variant="h3" color={colors.grey[100]}>
                ADMIN
              </Typography>
            </Box>
          ) : (
            <Box
              display="flex"
              marginBottom={"58px"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <img
                width="30px"
                height="30px"
                src="../../../public/vite.svg"
                alt="profile picture"
                style={{ borderRadius: "50%" }}
              />
              {/* <Typography variant="h6" color={colors.grey[100]}>
                ADMIN
              </Typography> */}
            </Box>
          )}
        </Box>

        {/* <MenuItem
          active={Selected === "Dashboard"}
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            setSelected("Dashboard");
          }}
          onMouseEnter={() => setHovered("Dashboard")}
          onMouseLeave={() => setHovered(null)}
          style={{
            textAlign: "center",
            color: colors.grey[100],
            background: hovered === "Dashboard" ? "red" : "transparent",
            "&::hover": {
              background: "red",
            },
          }}
        >
          Dashboard
        </MenuItem> */}
        <Item
          title={"Users"}
          icon={<MenuOutlinedIcon />}
          to={"/users"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />

        <Item
          title={"Boat Data"}
          icon={<MenuOutlinedIcon />}
          to={"/boatdata"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Ratings"}
          icon={<MenuOutlinedIcon />}
          to={"/ratings"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Advertising"}
          icon={<MenuOutlinedIcon />}
          to={"/advertising"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Service Providers"}
          icon={<MenuOutlinedIcon />}
          to={"/providers"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Requests"}
          icon={<MenuOutlinedIcon />}
          to={"/requests"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />

        {/* <MenuItem
          active={Selected === "Countries"}
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            setSelected("Countries");
          }}
          onMouseEnter={() => setHovered("Countries")}
          onMouseLeave={() => setHovered(null)}
          style={{
            textAlign: "center",
            color: colors.grey[100],
            background: hovered === "Countries" ? "red" : "transparent",
            "&::hover": {
              background: "red",
            },
          }}
        >
          Countries
        </MenuItem>
        <MenuItem
          active={Selected === "Boat Data"}
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            setSelected("Boat Data");
          }}
          onMouseEnter={() => setHovered("Boat Data")}
          onMouseLeave={() => setHovered(null)}
          style={{
            textAlign: "center",
            color: colors.grey[100],
            background: hovered === "Boat Data" ? "red" : "transparent",
            "&::hover": {
              background: "red",
            },
          }}
        >
          Boat Data
        </MenuItem>
        <MenuItem
          active={Selected === "Advertising"}
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            setSelected("Advertising");
          }}
          onMouseEnter={() => setHovered("Advertising")}
          onMouseLeave={() => setHovered(null)}
          style={{
            textAlign: "center",
            color: colors.grey[100],
            background: hovered === "Advertising" ? "red" : "transparent",
            "&::hover": {
              background: "red",
            },
          }}
        >
          Advertising
        </MenuItem>
        <MenuItem
          active={Selected === "Service Providers"}
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            setSelected("Service Providers");
          }}
          onMouseEnter={() => setHovered("Service Providers")}
          onMouseLeave={() => setHovered(null)}
          style={{
            textAlign: "center",
            color: colors.grey[100],
            background: hovered === "Service Providers" ? "red" : "transparent",
            "&::hover": {
              background: "red",
            },
          }}
        >
          Service Providers
        </MenuItem>
        <MenuItem
          active={Selected === "Requests"}
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            setSelected("Requests");
          }}
          onMouseEnter={() => setHovered("Requests")}
          onMouseLeave={() => setHovered(null)}
          style={{
            textAlign: "center",
            color: colors.grey[100],
            background: hovered === "Requests" ? "red" : "transparent",
            "&::hover": {
              background: "red",
            },
          }}
        >
          Requests
        </MenuItem> */}
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
