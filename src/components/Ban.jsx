import { Button, CircularProgress } from "@mui/material";
import EditModal from "./editModal";
import { useState } from "react";
import { mockDataTeam, userColumns } from "../data/mockData";
import AddModal from "./addModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { banUser, unbanUser } from "../network/usersServices";
import useUserStore from "../stores/useUserStore";
import { addItem } from "../network/network";

const Ban = ({ row, banEndpoint, unbanEndpoint, onApprove }) => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const { token, logout } = useUserStore();
  const [isBanned, setIsBanned] = useState(row.banned_at !== null);
  const [loading, setLoading] = useState(false);
  const handleBan = async () => {
    try {
      setLoading(true);
      await addItem(token, logout, banEndpoint, {});

      setIsBanned(!isBanned);
      // row.phone_number = 1;
      onApprove("1asdfasf");
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };
  const handleUnban = async () => {
    try {
      setLoading(true);
      await addItem(token, logout, unbanEndpoint, {});
      setIsBanned(!isBanned);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
    // setIsBanned(!isBanned);
  };

  return (
    <>
      {!isBanned ? (
        <Button
          variant="contained"
          color="error"
          onClick={handleBan}
          disabled={loading} // Disable the button while loading
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {loading ? t("Loading") : t("Ban")}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="success"
          type="button"
          onClick={handleUnban}
          disabled={loading} // Disable the button while loading
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {loading ? t("Loading") : t("Unban")}
        </Button>
      )}
    </>
  );
};

export default Ban;
