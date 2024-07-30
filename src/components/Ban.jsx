import { Button, CircularProgress } from "@mui/material";
import EditModal from "./editModal";
import { useState } from "react";
import { mockDataTeam, userColumns } from "../data/mockData";
import AddModal from "./addModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { banUser, unbanUser } from "../network/usersServices";
import useUserStore from "../stores/useUserStore";

const Ban = ({ row, ban, unban }) => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const { token, logout } = useUserStore();
  const [isBanned, setIsBanned] = useState(row.is_banned);
  const [loading, setLoading] = useState(false);
  const handleBan = async () => {
    // console.log("TOKEN ", token);
    try {
      setLoading(true);
      await ban(token, logout, row.id);
      setIsBanned(!isBanned);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };
  const handleUnban = async () => {
    try {
      setLoading(true);
      await unban(token, logout, row.id);
      setIsBanned(!isBanned);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
    setIsBanned(!isBanned);
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