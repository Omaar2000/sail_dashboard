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
const Ban = ({ row, banEndpoint, unbanEndpoint, updateRow }) => {
  const { t } = useTranslation();
  const { token, logout } = useUserStore();
  const [isBanned, setIsBanned] = useState(row.banned_at !== null);
  const [loading, setLoading] = useState(false);

  const handleBan = async () => {
    try {
      setLoading(true);
      await addItem(token, logout, banEndpoint, {});
      setIsBanned(true);
      updateRow(row.id, "Omar"); // Change name to "Omar" when banned
    } catch (error) {
      console.error("Error banning provider:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnban = async () => {
    try {
      setLoading(true);
      await addItem(token, logout, unbanEndpoint, {});
      setIsBanned(false);
      updateRow(row.id, "Not Banned"); // Change name to "Not Banned" when unbanned
    } catch (error) {
      console.error("Error unbanning provider:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isBanned ? (
        <Button
          variant="contained"
          color="error"
          onClick={handleBan}
          disabled={loading}
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
          onClick={handleUnban}
          disabled={loading}
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
