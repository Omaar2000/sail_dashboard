import {
  Button,
  ButtonGroup,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { verify } from "../network/providersServices";
import useUserStore from "../stores/useUserStore";

const Control = ({ endpoint, row }) => {
  const { t } = useTranslation();
  const { token, logout } = useUserStore();
  const [isVerified, setIsVerified] = useState(row.is_verified);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      await verify(token, logout, endpoint);
      setIsVerified(!isVerified);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {!isVerified ? (
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button
            size="small"
            color="success"
            onClick={handleClick}
            disabled={loading} // Disable the button while loading
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? t("Loading") : t("Verify")}
          </Button>
        </ButtonGroup>
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

export default Control;
