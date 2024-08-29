import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import {
  Call,
  Category,
  ChecklistRtl,
  ForkRight,
  Group,
  Groups,
  Image,
  Info,
  Language,
  ManageAccounts,
  NotificationAdd,
  Payment,
  PushPin,
  PushPinOutlined,
  Receipt,
  RequestPage,
  StackedLineChart,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useUserStore from "../../stores/useUserStore";

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
          borderRadius: "10px",
          transition: "background 0.1s ease-out",
          outline: "none",

          color:
            selected === to || hovered === title ? "#FFF" : colors.grey[100],
          backgroundColor:
            selected === to
              ? colors.primary[700]
              : hovered === title
              ? colors.primary[800]
              : title === "Providers List" ||
                title === "Providers Requests" ||
                title === "Payout Requests" ||
                title === "Boats Routes" ||
                title === "Boats Requests" ||
                title === "Feature List" ||
                title === "Categories"
              ? colors.primary[400]
              : colors.primary[400],
        }}
      >
        {t(title)}
      </MenuItem>
    </Link>
  );
};

const SidebarComponent = ({
  // pinned,
  // setPinned,
  isCollapsed,
  setIsCollapsed,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [providerHover, setProviderdHover] = useState(false);
  const [boatHover, setBoatHover] = useState(false);
  const params = useParams();
  const [Selected, setSelected] = useState(
    params["*"] === ""
      ? "/"
      : localStorage.getItem("selected")
      ? params["*"] || `${localStorage.getItem("selected")}`
      : params["*"]
  );
  const { t } = useTranslation();
  const { pinned, toggleSidebar } = useUserStore();

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
      onMouseEnter={() => {
        setIsCollapsed(false);
        localStorage.setItem("collapsed", false);
      }}
      onMouseLeave={() => {
        setIsCollapsed(true);
        localStorage.setItem("collapsed", true);
      }}
      style={{
        height: "100vh",
        border: "none",
        // position: "absolute",
        position: "fixed",
        zIndex: "1000",
        transition: "all 0.2s ease-out",
        // padding: "1rem",
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
      <Menu style={{ padding: "1rem 0.3rem" }}>
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
                transition: "all 0.2s ease-out",
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
                onClick={toggleSidebar}
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
                style={{ borderRadius: "10%" }}
              /> */}
              {/* <Typography variant="h6" color={colors.grey[100]}>
                ADMIN
              </Typography> */}
            </Box>
          )}
        </Box>

        <Item
          title={"Dashboard"}
          icon={<StackedLineChart />}
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
          hovered={hovered}
          setSelected={setSelected}
          setHovered={setHovered}
        />
        <SubMenu
          label={t("Boats Data")}
          icon={<Info />}
          // style={{ backgroundColor: boatHover }}
          style={{
            borderRadius: "10px",
            transition: "all 0.1s ease-out",
            outline: "none",
            backgroundColor:
              Selected === "categories" || Selected === "boatroutes"
                ? colors.blueAccent[600]
                : boatHover
                ? colors.primary[800]
                : colors.primary[400],
            color: boatHover && "#FFF",
          }}
          onMouseEnter={() => setBoatHover(true)}
          onMouseLeave={() => setBoatHover(false)}
        >
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              // border: `1px ${colors.blueAccent[400]} dashed`,
            }}
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
              title={"Boats Requests"}
              icon={<RequestPage />}
              to={"boatsrequests"}
              selected={Selected}
              setSelected={setSelected}
              hovered={hovered}
              setHovered={setHovered}
            />
            <Item
              title={"Feature List"}
              icon={<ChecklistRtl />}
              to={"features"}
              selected={Selected}
              setSelected={setSelected}
              hovered={hovered}
              setHovered={setHovered}
            />
          </Box>
        </SubMenu>
        {/* <Item
          title={"Reviews"}
          icon={<Star />}
          to={"reviews"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        /> */}
        <Item
          title={"Countries"}
          icon={<Language />}
          to={"countries"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        {/* <Item
          title={"Cities"}
          icon={<LocationCity />}
          to={"cities"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        /> */}
        <Item
          title={"Country Codes"}
          icon={<Call />}
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
          icon={<Group />}
          // style={{ backgroundColor: providerHover }}
          style={{
            borderRadius: "10px",
            // transition: "all 0.1s ease-out",
            outline: "none",

            backgroundColor:
              Selected === "providersrequests" ||
              Selected === "providerlist" ||
              Selected === "payoutrequests"
                ? colors.blueAccent[600]
                : providerHover
                ? colors.primary[800]
                : colors.primary[400],
          }}
          onMouseEnter={() => setProviderdHover(true)}
          onMouseLeave={() => setProviderdHover(false)}
        >
          <Box sx={{ backgroundColor: colors.primary[400] }}>
            <Item
              title={"Providers List"}
              icon={<Group />}
              to={"providerlist"}
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
          </Box>
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
          icon={<ManageAccounts />}
          to={"supervisors"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Notifications"}
          icon={<NotificationAdd />}
          to={"notifications"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        {/* <Item
          title={"Complaints"}
          icon={<Feedback />}
          to={"complaints"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        /> */}
        <Item
          title={"Transactions"}
          icon={<Receipt />}
          to={"transactions"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        <Item
          title={"Payouts"}
          icon={<Payment />}
          to={"payouts"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        />
        {/* <Item
          title={"Settings"}
          icon={<Settings />}
          to={"settings"}
          selected={Selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
        /> */}
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
