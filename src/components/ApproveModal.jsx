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

const ApproveModal = ({
  verifyIsOpen,
  setVerifyIsOpen,
  selectedItems,
  Endpoint,
}) => {
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

  //       const data = await getAll(token, logout, `https://dev.sailgloble.com/admin/admin/all`);
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

  const handleClick = () => {
    // e.preventDefault();
    selectedItems.map(async (element) => {
      try {
        setLoading(true);
        if (element.approvedBy === null) {
          await addItem(
            token,
            logout,
            `${Endpoint}${element.requestTypeId}`,
            {}
          );
          setTimeout(() => {
            setVerifyIsOpen(false);
            // window.location.reload();
          }, 500);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
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
          {t("Approve Requests ??")}
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
