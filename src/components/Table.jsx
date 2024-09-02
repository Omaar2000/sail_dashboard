// image previewer
// add category
// make edit and add generic
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import {
  AdminPanelSettingsOutlined,
  HeadphonesRounded,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridLogicOperator,
  GridOverlay,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  mockDataContacts,
  mockDataTeam,
  categoriesColumns,
  userColumns,
  mockTransactions,
} from "../data/mockData.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import { useTranslation } from "react-i18next";
import "./layout/style.css";
import CustomFooter from "./Pagination.jsx";
import usePaginationStore from "../stores/usePaginationStore.js";
import SearchBar from "./searchBar.jsx";
import { assignAdmin, deleteItem, getAll } from "../network/network.js";
import AdminModal from "./adminDropdown.jsx";
import RandomModal from "./RandomModal.jsx";
import ApproveModal from "./ApproveModal.jsx";
import * as XLSX from "xlsx";

const TableComponent = ({ Endpoint, to, rows, columns, loading, add }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const [data, setRows] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [adminIsOpen, setAdminIsOpen] = useState(false);
  const [verifyIsOpen, setVerifyIsOpen] = useState(false);
  const [adminRandomIsOpen, setAdminRandomIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [filterValues, setFilterValues] = useState(null);

  const { page, setPageSize, setPage } = usePaginationStore();

  const navigate = useNavigate();

  useEffect(() => {
    setRows([...rows]);
  }, [rows, page]);

  const { token, logout } = useUserStore();

  const handleDelete = () => {
    selectedItems.map(async (row) => {
      try {
        await deleteItem(token, logout, Endpoint + row.id);
        setPage(page);
        setRows(data.filter((row) => !selectedItems.includes(row)) || []);
      } catch (error) {
        console.error("error");
      }
    });
  };
  const handleSelectionChange = (newSelection) => {
    console.log(newSelection);
    setSelectedIDs(newSelection);
    const selectedRowData = newSelection.map((id) =>
      data.find((row) => row.id === id)
    );
    setSelectedItems(selectedRowData);
    console.log(selectedItems);
  };

  const handleFilterModelChange = (model) => {
    // Extract and store filter values
    setFilterValues(model.filters);
    console.log("Filter values:", model);
    // You can now use filterValues in your application logic
  };

  const handleAddClick = () => {
    navigate(to);
  };
  const handleAssignClick = () => {
    setAdminIsOpen(true);
  };
  const handleVerifyClick = () => {
    setVerifyIsOpen(true);
  };
  const handleAssignRandom = () => {
    setAdminRandomIsOpen(true);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to the first page whenever the page size changes
  };

  const exportToExcel = async () => {
    try {
      // Fetch the transaction data from the endpoint
      setLoading(true);
      const data = await getAll(
        token,
        logout,
        `https://dev.sailgloble.com/admin/transactions`
      );

      // Check if data exists and map it to match the column headers
      if (data && data.data) {
        const transactions = data.data.map((transaction) => ({
          "Provider ID": transaction.provider,
          Date: transaction.createdAt,
          Amount: transaction.amount,
          Status: transaction.status,
          "Order ID": transaction.orderId,
          "Transaction ID": transaction.providerTransactionId,
        }));

        // Create the worksheet and workbook
        const worksheet = XLSX.utils.json_to_sheet(transactions);
        const workbook = XLSX.utils.book_new();

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

        // Export the workbook to an Excel file
        XLSX.writeFile(workbook, "transactions.xlsx");

        console.log("Transactions exported to transactions.xlsx");
        setLoading(false);
      } else {
        console.error("No transaction data available");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  return (
    <Box m="10px">
      <Box
        display="flex"
        justifyContent={
          selectedItems.length !== 0 || to !== "" ? "space-between" : "start"
        }
        mx="1rem"
      >
        <SearchBar />

        {to === "transactions" ? (
          <Box
            sx={{
              marginBottom: "1px",
              display: "flex",
              flexShrink: "1",
              // justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              marginInlineEnd: "30px",
            }}
          >
            <Button
              variant="contained"
              onClick={exportToExcel}
              color="secondary"
              disabled={isLoading} // Disable the button while isLoading
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isLoading ? t("loading") : t("Export to Excel")}
            </Button>
            {/* <Button
              onClick={handleAssignClick}
              variant="contained"
              color="success"
              disabled={selectedItems.length === 0}
              // style={{ margin: "20px" }}
            >
              {t("Assign")}
            </Button>
            <Button
              onClick={handleAssignRandom}
              variant="contained"
              color="success"
              disabled={selectedItems.length === 0}
              // style={{ margin: "20px" }}
            >
              {t("Assign Random")}
            </Button> */}
          </Box>
        ) : to === "/send" ? (
          <Box
            sx={{
              marginBottom: "1px",
              display: "flex",
              flexShrink: "1",
              // justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              marginInlineEnd: "30px",
            }}
          >
            <Button
              onClick={handleAddClick}
              variant="contained"
              color="success"
              style={{ margin: "0 20px" }}
            >
              {t(add)}
            </Button>
            {/* <Button
              onClick={handleAssignClick}
              variant="contained"
              color="success"
              disabled={selectedItems.length === 0}
              // style={{ margin: "20px" }}
            >
              {t("Assign")}
            </Button>
            <Button
              onClick={handleAssignRandom}
              variant="contained"
              color="success"
              disabled={selectedItems.length === 0}
              // style={{ margin: "20px" }}
            >
              {t("Assign Random")}
            </Button> */}
          </Box>
        ) : to === "/" ? (
          <Box
            sx={{
              marginBottom: "1px",
              display: "flex",
              flexShrink: "1",
              // justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              marginInlineEnd: "30px",
            }}
          >
            {/* <Button
              onClick={handleVerifyClick}
              variant="contained"
              color="success"
              disabled={selectedItems.length === 0}
              // style={{ margin: "20px" }}
            >
              {t("Verify Selected")}
            </Button> */}
            {/* <Button
              onClick={handleAssignClick}
              variant="contained"
              color="success"
              disabled={selectedItems.length === 0}
              // style={{ margin: "20px" }}
            >
              {t("Assign")}
            </Button>
            <Button
              onClick={handleAssignRandom}
              variant="contained"
              color="success"
              disabled={selectedItems.length === 0}
              // style={{ margin: "20px" }}
            >
              {t("Assign Random")}
            </Button> */}
          </Box>
        ) : to === "/admin" ? (
          <Box
            sx={{
              marginBottom: "1px",
              display: "flex",
              flexShrink: "1",
              // justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              marginInlineEnd: "30px",
            }}
          >
            <Button
              onClick={handleVerifyClick}
              variant="contained"
              color="success"
              disabled={selectedItems.length === 0}
              // style={{ margin: "20px" }}
            >
              {t("Verify Selected")}
            </Button>
            {/* <Button
              onClick={handleAssignClick}
              variant="contained"
              color="success"
              disabled={selectedItems.length === 0}
              // style={{ margin: "20px" }}
            >
              {t("Assign")}
            </Button>
            <Button
              onClick={handleAssignRandom}
              variant="contained"
              color="success"
              disabled={selectedItems.length === 0}
              // style={{ margin: "20px" }}
            >
              {t("Assign Random")}
            </Button> */}
          </Box>
        ) : selectedItems.length !== 0 && to !== "" ? (
          <Box
            sx={{
              marginBottom: "1px",
              marginInlineEnd: "10px",
              display: "flex",
              flexShrink: "1",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => setDialogIsOpen(true)}
              variant="contained"
              color="error"
              // style={{ margin: "0 20px" }}
            >
              Delete
            </Button>

            <Button
              onClick={handleAddClick}
              variant="contained"
              color="success"
              style={{ margin: "0 20px" }}
            >
              {t(add)}
            </Button>
          </Box>
        ) : to !== "" ? (
          <Box
            sx={{
              marginBottom: "1px",
              display: "flex",
              flexShrink: "1",
              justifyContent: "end",
              alignItems: "center",
              marginInlineEnd: "30px",
            }}
          >
            <Button
              onClick={handleAddClick}
              variant="contained"
              color="success"
              // style={{ margin: "20px" }}
            >
              {t(add)}
            </Button>
          </Box>
        ) : (
          selectedItems.length !== 0 &&
          to === "" && (
            <Box
              sx={{
                marginBottom: "1px",
                marginInlineEnd: "10px",
                display: "flex",
                flexShrink: "1",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => setDialogIsOpen(true)}
                variant="contained"
                color="error"
                // style={{ margin: "0 20px" }}
              >
                Delete
              </Button>
            </Box>
          )
        )}
      </Box>
      <Box
        // m={selectedItems.length === 0 && "54px 0 0 0"}
        // height="85vh"
        // sx={{
        // maxHeight: "10px",
        // maxWidth="100%"
        sx={{
          height: "74vh",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
            // textAlign: "start !important",
          },
          "& .MuiDataGrid-headerContainer": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: `${colors.primary[400]} !important`,
          },
          ".MuiDataGrid-footerContainer": {
            display: "none",
            // marginTop: "200px",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.primary[200]} !important`,
          },
          "& .MuiDataGrid-overlay ": {
            // color: `${colors.greenAccent[200]} !important`,
            // height: "1px",
            // display: "block",
            margin: "100px 0",
            // justifyContent: "center",
            // alignItems: "center",
            // overflow: "hidden",
          },
        }}
      >
        <DataGrid
          checkboxSelection
          disableRowSelectionOnClick
          rows={data}
          columns={columns}
          pagination
          paginationMode="server"
          onFilterModelChange={handleFilterModelChange}
          onRowSelectionModelChange={(newSelection) =>
            handleSelectionChange(newSelection)
          }
          loading={loading}
          // paginationMode="server"
          sx={{ direction: "ltr !important", textAlign: "start" }}
        />
        {to !== "/addcover" && (
          <CustomFooter handlePageSizeChange={handlePageSizeChange} />
        )}
      </Box>
      <Dialog
        open={dialogIsOpen}
        onClose={() => setDialogIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to confirm the deletion process?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDialogIsOpen(false)} color="info">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete();
              setDialogIsOpen(false);
            }}
            color="error"
            autoFocus
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ApproveModal
        verifyIsOpen={verifyIsOpen}
        setVerifyIsOpen={setVerifyIsOpen}
        selectedItems={selectedItems}
        Endpoint={Endpoint}
      />
      <AdminModal
        adminIsOpen={adminIsOpen}
        setAdminIsOpen={setAdminIsOpen}
        selectedItems={selectedIDs}
      />
      <RandomModal
        adminRandomIsOpen={adminRandomIsOpen}
        setAdminRandomIsOpen={setAdminRandomIsOpen}
        selectedItems={selectedIDs}
      />
    </Box>
  );
};

export default TableComponent;
