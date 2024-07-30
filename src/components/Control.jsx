import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { verifyProvider } from "../network/providersServices";
import useUserStore from "../stores/useUserStore";

const Control = ({ row }) => {
  const { t } = useTranslation();
  const { token, logout } = useUserStore();
  const [isVerified, setIsVerified] = useState(row.is_verified);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      await verifyProvider(token, logout, row.id);
      setIsVerified(!isBanned);
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
        <h3>Verified</h3>
      )}
    </>
  );
};

export default Control;
