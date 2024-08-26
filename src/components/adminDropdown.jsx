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

const AdminModal = ({ adminIsOpen, setAdminIsOpen, selectedItems }) => {
  // const [adminIsOpen, setAdminIsOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [admin, setAdmin] = useState(null);

  console.log(selectedItems);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAll(token, logout, `api/admin/admin/all`);
        setRows(data.data);
        // setTotalPages(data.page_count);

        console.log(data);
      } catch (error) {
        console.error("Error getting Admin:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await assignAdmin(
        token,
        logout,
        `api/admin/provider-requests?adminId=${admin}&requestId${selectedItems}`,
        selectedItems
      );
      setTimeout(() => {
        setAdminIsOpen(false);
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
        open={adminIsOpen}
        onClose={() => {
          // set
          setAdminIsOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ minWidth: "15rem" }} id="alert-dialog-title">
          {t("Assign to an admin")}
        </DialogTitle>
        <DialogContent>
          <FormControl
            // disabled={rows.length === 0}
            fullWidth
            margin="normal"
            sx={{
              mt: 2,
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: colors.primary[100] },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.primary[100],
              },
            }}
          >
            <InputLabel id="type-label">
              {rows.length !== 0 ? t("Admin") : t("No Admins")}
            </InputLabel>

            <Select
              labelId="type-label"
              name="type"
              onChange={(e) => {
                setAdmin(e.target.value);
              }}
              required
              label="Type"
            >
              {rows.length > 0 &&
                rows.map((row, index) => (
                  <MenuItem key={index} value={row.id}>
                    {t(row.user_name)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => setAdminIsOpen(false)} color="info">
            Cancel
          </Button> */}
          <Button
            onClick={handleClick}
            color="success"
            autoFocus
            variant="contained"
            disabled={loading || rows.length === 0 || admin === null}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? t("Loading") : t("Save")}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AdminModal;
