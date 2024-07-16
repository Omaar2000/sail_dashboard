import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { Box, Button, IconButton, styled, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import {
  Category,
  ChecklistRtl,
  DataArray,
  DataObject,
  ForkRight,
  Groups,
  GroupsOutlined,
  Height,
  Image,
  Info,
  LineAxis,
  PushPin,
  PushPinOutlined,
  Star,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <MenuItem
        active={selected === title}
        icon={icon}
        onClick={() => {
          localStorage.setItem("selected", to);
          setSelected(to);
        }}
        onMouseEnter={() => setHovered(title)}
        onMouseLeave={() => setHovered(null)}
        style={{
          textAlign: "left",
          color: colors.grey[100],
          backgroundColor:
            selected === to
              ? colors.primary[700]
              : hovered === title
              ? colors.primary[800]
              : colors.primary[400],
        }}
      >
        {t(title)}
      </MenuItem>
    </Link>
  );
};

const SidebarComponent = ({
  pinned,
  setPinned,
  isCollapsed,
  setIsCollapsed,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(theme.palette.mode);
  const [providerHover, setProviderdHover] = useState(false);
  const [boatHover, setBoatHover] = useState(false);
  const params = useParams();
  console.log(params["*"]);
  const [Selected, setSelected] = useState(
    params["*"] === ""
      ? "/"
      : localStorage.getItem("selected")
      ? `${localStorage.getItem("selected")}`
      : params["*"]
  );
  console.log(Selected);
  const { t } = useTranslation();

  const [hovered, setHovered] = useState(null);
  // const StyledSidebar = styled(Sidebar)`
  //   .pro-sidebar-inner {
  //     &::-webkit-scrollbar {
  //       display: none;
  //     }
  //     -ms-overflow-style: none; /* IE and Edge */
  //     scrollbar-width: none; /* Firefox */
  //   }
  // `;
  return (
    <Sidebar
      collapsed={!pinned && isCollapsed}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      style={{
        height: "100vh",
        border: "none",
        // position: "absolute",
        position: "fixed",
        zIndex: "1000",
        // ".ps-sidebar-container": {
        //   "&::-webkit-scrollbar": {
        //     display: "none !important",
        //   },
        //   "-ms-overflow-style": "none !important",
        //   "scrollbar-width": "10px !important",
        // },
      }}
      backgroundColor={colors.primary[400]}
      // transitionDuration={"3000"}
    >
      <Menu>
        <Box
          display="flex"
          pt="20px"
          // justifyContent={"space-between"}
          // alignItems={"center"}
        >
          {/* <MenuOutlinedIcon /> */}
          {pinned || !isCollapsed ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                mb: "21.5px",
              }}
              // alignItems={"center"}
            >
              <Typography variant="h3" color={colors.grey[100]}>
                ADMIN
              </Typography>
              <IconButton
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                }}
                onClick={() => {
                  setPinned(!pinned);
                  localStorage.setItem("pinned", pinned);
                }}
              >
                {pinned ? <PushPin /> : <PushPinOutlined />}
              </IconButton>
            </Box>
          ) : (
            <Box
              display="flex"
              marginBottom={"58px"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              {/* <img
                width="30px"
                height="30px"
                src="../../../public/vite.svg"
                alt="profile picture"
                style={{ borderRadius: "50%" }}
              /> */}
              {/* <Typography variant="h6" color={colors.grey[100]}>
                ADMIN
              </Typography> */}
            </Box>
          )}
        </Box>

        <Item
          title={"Home"}
          icon={<MenuOutlinedIcon />}
          to={"/"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Users"}
          icon={<Groups />}
          to={"users"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <SubMenu
          label={t("Boats Data")}
          icon={<Info />}
          // style={{ backgroundColor: boatHover }}
          style={{
            backgroundColor: boatHover
              ? colors.primary[800]
              : colors.primary[400],
          }}
          onMouseEnter={() => setBoatHover(true)}
          onMouseLeave={() => setBoatHover(false)}
        >
          <Item
            title={"Categories"}
            icon={<Category />}
            to={"categories"}
            selected={Selected}
            setSelected={setSelected}
            hovered={hovered}
            setHovered={setHovered}
          />
          <Item
            title={"Boats Routes"}
            icon={<ForkRight />}
            to={"boatroutes"}
            selected={Selected}
            setSelected={setSelected}
            hovered={hovered}
            setHovered={setHovered}
          />
          <Item
            title={"Feature List"}
            icon={<ChecklistRtl />}
            to={"featurelist"}
            selected={Selected}
            setSelected={setSelected}
            hovered={hovered}
            setHovered={setHovered}
          />
        </SubMenu>
        <Item
          title={"Reviews"}
          icon={<Star />}
          to={"reviews"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Countries"}
          icon={<Star />}
          to={"countries"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Cities"}
          icon={<Star />}
          to={"cities"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Country Codes"}
          icon={<Star />}
          to={"codes"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Covers"}
          icon={<Image />}
          to={"covers"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <SubMenu
          label={t("Providers")}
          icon={<MenuOutlinedIcon />}
          // style={{ backgroundColor: providerHover }}
          style={{
            backgroundColor: providerHover
              ? colors.primary[800]
              : colors.primary[400],
          }}
          onMouseEnter={() => setProviderdHover(true)}
          onMouseLeave={() => setProviderdHover(false)}
        >
          <Item
            title={"All Providers"}
            icon={<MenuOutlinedIcon />}
            to={"allproviders"}
            selected={Selected}
            setSelected={setSelected}
            hovered={hovered}
            setHovered={setHovered}
          />
          <Item
            title={"Providers Requests"}
            icon={<MenuOutlinedIcon />}
            to={"providersrequests"}
            selected={Selected}
            setSelected={setSelected}
            hovered={hovered}
            setHovered={setHovered}
          />
          <Item
            title={"Payout Requests"}
            icon={<MenuOutlinedIcon />}
            to={"payoutrequests"}
            selected={Selected}
            setSelected={setSelected}
            hovered={hovered}
            setHovered={setHovered}
          />
        </SubMenu>
        <Item
          title={"Orders"}
          icon={<MenuOutlinedIcon />}
          to={"orders"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Supervisors"}
          icon={<MenuOutlinedIcon />}
          to={"supervisors"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Notifications"}
          icon={<MenuOutlinedIcon />}
          to={"notifications"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Complaints"}
          icon={<MenuOutlinedIcon />}
          to={"complaints"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Transactions"}
          icon={<MenuOutlinedIcon />}
          to={"transactions"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Payouts"}
          icon={<MenuOutlinedIcon />}
          to={"payouts"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Settings"}
          icon={<MenuOutlinedIcon />}
          to={"settings"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
