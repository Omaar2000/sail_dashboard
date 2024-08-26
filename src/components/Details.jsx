import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const DetailsButton = ({ row }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate("/providerdetails", { state: row });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {t("Details")}
    </Button>
  );
};

export default DetailsButton;
