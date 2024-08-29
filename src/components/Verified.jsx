import { Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { verify } from "../network/providersServices";
import useUserStore from "../stores/useUserStore";

const Verified = ({ row }) => {
  const { t } = useTranslation();
  const { token, logout } = useUserStore();
  const [isVerified, setIsVerified] = useState(row.is_verified);

  return (
    <>
      {!isVerified ? (
        <Typography
          mt="0.8rem"
          fontSize="16px"
          fontWeight="bold"
          color="#f44336"
        >
          {t("Not Verified")}
        </Typography>
      ) : (
        <Typography
          mt="0.8rem"
          fontSize="16px"
          fontWeight="bold"
          color="#83ff63"
        >
          {t("Verified")}
        </Typography>
      )}
    </>
  );
};

export default Verified;
