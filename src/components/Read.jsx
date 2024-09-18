import {
  Button,
  ButtonGroup,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useUserStore from "../stores/useUserStore";
import { addItem } from "../network/network";

const Read = ({ row }) => {
  const { t } = useTranslation();
  const { token, logout } = useUserStore();
  const [isRead, setIsRead] = useState(row.isRead);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      await addItem(
        token,
        logout,
        `https://sailgloble.com/admin/notifications/read`,
        {
          ids: [row.id],
        }
      );
      setIsRead(!isRead);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {!isRead ? (
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button
            size="small"
            color="info"
            onClick={handleClick}
            disabled={loading} // Disable the button while loading
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? t("Loading") : t("Mark as Read")}
          </Button>
        </ButtonGroup>
      ) : (
        <Typography
          mt="0.8rem"
          fontSize="16px"
          fontWeight="bold"
          color="#83ff63"
        >
          {t("Read")}
        </Typography>
      )}
    </>
  );
};

export default Read;
