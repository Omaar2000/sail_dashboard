import { useTheme } from "@emotion/react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../theme";
import { useTranslation } from "react-i18next";
import { addItem, assignAdmin, getAll } from "../network/network";
import useUserStore from "../stores/useUserStore";

const ApproveModal = ({ verifyIsOpen, setVerifyIsOpen, selectedItems }) => {
  // const [adminIsOpen, setVerifyIsOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  console.log(selectedItems);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       const data = await getAll(token, logout, `api/admin/admin/all`);
  //       setRows(data.data);
  //       // setTotalPages(data.page_count);

  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error getting Admin:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      selectedItems.forEach(async (element) => {
        await addItem(
          token,
          logout,
          `api/admin/provider-requests/approve/account/${element}`,
          {}
        );
      });
      setTimeout(() => {
        setVerifyIsOpen(false);
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <Dialog
        open={verifyIsOpen}
        onClose={() => {
          // set
          setVerifyIsOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ minWidth: "15rem" }} id="alert-dialog-title">
          {t("Approve admins ??")}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setVerifyIsOpen(false)} color="info">
            Cancel
          </Button>
          <Button
            onClick={handleClick}
            color="success"
            autoFocus
            variant="contained"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? t("Loading") : t("Verify")}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default ApproveModal;