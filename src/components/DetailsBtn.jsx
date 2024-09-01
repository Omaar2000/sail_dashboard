import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const DetailsBtn = ({ row, to }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(to, { state: row });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {t("Details")}
    </Button>
  );
};

export default DetailsBtn;
