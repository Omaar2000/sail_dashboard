import { useTheme } from "@emotion/react";
import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";
import { Link } from "react-router-dom";
import { Grid3x3, WidthFull } from "@mui/icons-material";
import General from "../components/General";
import SEO from "../components/SEO";
import AppSettings from "../components/AppSettings";
import EmailData from "../components/EmailData";
import Policy from "../components/Policy";
import Terms from "../components/TermsAndConditions";
import AboutPlatform from "../components/AboutPlatform";
import AboutSite from "../components/AboutSite";
import NotificationsData from "../components/NotificationsData";
import API from "../components/API";

const SettingItem = ({ title, selected, setSelected, hovered, setHovered }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <a
      style={{
        background:
          selected === title && hovered === title
            ? colors.blueAccent[700]
            : selected === title
            ? colors.blueAccent[500]
            : hovered === title
            ? colors.grey[500]
            : colors.primary[400],
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        marginBottom: "0.2rem",
        cursor: "pointer",
        transition: "all 0.2s ease-out",
      }}
      onMouseEnter={() => setHovered(title)}
      onMouseLeave={() => setHovered("")}
      onClick={() => setSelected(title)}
    >
      {t(title)}
    </a>
  );
};

const Settings = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("General");
  const [hovered, setHovered] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Grid
      mt={"2rem"}
      display="grid"
      height={"fit-content"}
      gridTemplateColumns="repeat(12, 1fr)"
      gridRow={"auto"}
      gap="1rem"
      marginInline="2rem"
      marginBottom="3rem"
    >
      <Box
        display={"flex"}
        gridColumn="span 3"
        flexDirection="column"
        // textAlign={"left"}
      >
        <SettingItem
          title={t("General")}
          setSelected={setSelected}
          setHovered={setHovered}
          hovered={hovered}
          selected={selected}
        />
        <SettingItem
          title={t("SEO")}
          setSelected={setSelected}
          setHovered={setHovered}
          hovered={hovered}
          selected={selected}
        />
        <SettingItem
          title={t("App Settings")}
          setSelected={setSelected}
          setHovered={setHovered}
          hovered={hovered}
          selected={selected}
        />
        <SettingItem
          title={t("Terms and Conditions")}
          setSelected={setSelected}
          setHovered={setHovered}
          hovered={hovered}
          selected={selected}
        />
        <SettingItem
          title={t("About the Platform")}
          setSelected={setSelected}
          setHovered={setHovered}
          hovered={hovered}
          selected={selected}
        />
        <SettingItem
          title={t("About the Site")}
          setSelected={setSelected}
          setHovered={setHovered}
          hovered={hovered}
          selected={selected}
        />
        <SettingItem
          title={t("Privacy Policy")}
          setSelected={setSelected}
          setHovered={setHovered}
          hovered={hovered}
          selected={selected}
        />
        <SettingItem
          title={t("Email Data")}
          setSelected={setSelected}
          setHovered={setHovered}
          hovered={hovered}
          selected={selected}
        />
        <SettingItem
          title={t("Notifications Data")}
          setSelected={setSelected}
          setHovered={setHovered}
          hovered={hovered}
          selected={selected}
        />
        <SettingItem
          title={t("API Data")}
          setSelected={setSelected}
          setHovered={setHovered}
          hovered={hovered}
          selected={selected}
        />
      </Box>
      <Box
        gridColumn="span 9"
        sx={{ background: colors.primary[400], borderRadius: "10px" }}
      >
        {selected === "General" ? (
          <General />
        ) : selected === "SEO" ? (
          <SEO />
        ) : selected === "App Settings" ? (
          <AppSettings />
        ) : selected === "Terms and Conditions" ? (
          <Terms />
        ) : selected === "About the Platform" ? (
          <AboutPlatform />
        ) : selected === "About the Site" ? (
          <AboutSite />
        ) : selected === "Privacy Policy" ? (
          <Policy />
        ) : selected === "Email Data" ? (
          <EmailData />
        ) : selected === "Notifications Data" ? (
          <NotificationsData />
        ) : selected === "API Data" ? (
          <API />
        ) : (
          <></>
        )}
      </Box>
    </Grid>
  );
};

export default Settings;
