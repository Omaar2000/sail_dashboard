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

const TableComponent = ({
  Delete,
  to,
  rows,
  columns,
  loading,
  pageNo,
  setPageNo,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const [data, setRows] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setRows([...rows]);
  }, [rows]);

  /*
  // const {
    data,
    isLoading,
    isError,
    error 
  } = useQuery({
    fetchFn: getAll
  })
  

  */
  const { token, logout } = useUserStore();

  const handleDelete = () => {
    try {
      selectedItems.map((row) => {
        Delete(token, logout, row.id);
      });
      window.location.reload();
      // console.log(selectedItems);
      // setRows(data.filter((row) => !selectedItems.includes(row)) || []);
    } catch (error) {
      console.error("errrrrrrrrrorrrrrrrrrrrrrrrrr");
    }
  };
  const handleSelectionChange = (newSelection) => {
    console.log(newSelection);
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

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleSaveNewRow = (newRow) => {
    const updatedData = [...data, { id: data.length + 1, ...newRow }];
    setRows(updatedData);

    // Optionally, make an API call to save the new row to the server
    // saveNewRowToServer(newRow);
  };

  return (
    <Box
      m="10px"
      // display={"flex"}
      // sx={{
      //   flexDirection: "column",
      //   alignItems: "center",
      //   justifyContent: "center",
      // }}
    >
      {selectedItems.length !== 0 && to !== "" ? (
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
            {t("Add New Row")}
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
            {t("Add New Row")}
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
      <Box
        // m={selectedItems.length === 0 && "54px 0 0 0"}
        // height="85vh"
        // sx={{
        // maxHeight: "10px",
        // maxWidth="100%"
        sx={{
          // maxHeight: "10px",
          height: "85vh",
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
            borderTop: "none",
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
          page={0}
          rowCount={2 * 10}
          onPageChange={(params) => console.log(params.data)}
          onPageSizeChange={(params) => console.log(params)}
          onFilterModelChange={handleFilterModelChange}
          onRowSelectionModelChange={(newSelection) =>
            handleSelectionChange(newSelection)
          }
          loading={loading}
          // paginationMode="server"
          sx={{ direction: "ltr !important", textAlign: "start" }}
          pageSizeOptions={[5, 10, 25, 100]}
        />
      </Box>
      <Dialog
        open={dialogIsOpen}
        onClose={() => setDialogIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
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
    </Box>
  );
};

export default TableComponent;

//------------------------------------------------------------------------------------------------
// const theme = useTheme();
// const colors = tokens(theme.palette.mode);

// const columns = [
//   { field: "id", headerName: "ID", flex: 0.5 },
//   { field: "registrarId", headerName: "Registrar ID" },
//   {
//     field: "name",
//     headerName: "Name",
//     flex: 1,
//     cellClassName: "name-column--cell",
//   },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     headerAlign: "left",
//     align: "left",
//   },
//   {
//     field: "phone",
//     headerName: "Phone Number",
//     flex: 1,
//   },
//   {
//     field: "email",
//     headerName: "Email",
//     flex: 1,
//   },
//   {
//     field: "address",
//     headerName: "Address",
//     flex: 1,
//   },
//   {
//     field: "city",
//     headerName: "City",
//     flex: 1,
//   },
//   {
//     field: "zipCode",
//     headerName: "Zip Code",
//     flex: 1,
//   },
// ];

// return (
//   <Box m="20px">
//     {/* <Header
//       title="CONTACTS"
//       subtitle="List of Contacts for Future Reference"
//     /> */}
//     <Box
//       m="40px 0 0 0"
//       height="75vh"
//       sx={{
//         "& .MuiDataGrid-root": {
//           border: "none",
//         },
//         "& .MuiDataGrid-cell": {
//           borderBottom: "none",
//         },
//         "& .name-column--cell": {
//           color: colors.greenAccent[300],
//         },
//         "& .MuiDataGrid-columnHeaders": {
//           backgroundColor: colors.blueAccent[700],
//           borderBottom: "none",
//         },
//         "& .MuiDataGrid-virtualScroller": {
//           backgroundColor: colors.primary[400],
//         },
//         "& .MuiDataGrid-footerContainer": {
//           borderTop: "none",
//           backgroundColor: colors.blueAccent[700],
//         },
//         "& .MuiCheckbox-root": {
//           color: `${colors.greenAccent[200]} !important`,
//         },
//         "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//           color: `${colors.grey[100]} !important`,
//         },
//       }}
//     >
//       <DataGrid
//         rows={mockDataContacts}
//         columns={columns}
//         components={{ Toolbar: GridToolbar }}
//       />
//     </Box>
//   </Box>
// );

/* <AddModal
        open={openAddModal}
        handleClose={handleCloseAddModal}
        handleSave={handleSaveNewRow}
        // formInputs={formInputs}
        columns={userColumns}
      /> */
