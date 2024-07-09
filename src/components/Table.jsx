import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import {
  AdminPanelSettingsOutlined,
  HeadphonesRounded,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  mockDataContacts,
  mockDataTeam,
  categoriesColumns,
  userColumns,
  mockTransactions,
} from "../data/mockData.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddModal from "./addModal";
import axios from "axios";

export const getAllCategories = async () => {
  const res = await axios.get("api/admin/categories?limit=10", {
    headers: { "x-custom-lang": "ar" },
  });
  // setRows();
  console.log(res.data);
  return res.data.data;
};

const TableComponent = ({ formInputs, data, loading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [filterValues, setFilterValues] = useState([]);
  const [mockTeam, setData] = useState(data);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [rows, setRows] = useState([]);
  // useEffect(() => {
  //   setData(getAllCategories());
  // }, []);

  const handleDelete = () => {
    console.log(selectedItems);
    setRows(rows.filter((row) => !selectedItems.includes(row)) || []);
  };
  const handleSelectionChange = (newSelection) => {
    console.log(newSelection);
    const selectedRowData = newSelection.map((id) =>
      rows.find((row) => row.id === id)
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
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleSaveNewRow = (newRow) => {
    const updatedData = [...mockTeam, { id: mockTeam.length + 1, ...newRow }];
    setData(updatedData);

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
      {selectedItems.length !== 0 ? (
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
          {/* <Link
            style={{
              textDecoration: "none",
              backgroundColor: "red",

              color: "white",
              padding: "8px 16px",
              fontSize: "18px",
              marginInlineEnd: "1rem",
              borderRadius: "10px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.redAccent[500]; // Original color
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "red"; // Darker shade for hover
            }}
            onClick={handleDelete}
          >
            Delete
          </Link> */}

          <Button
            onClick={handleDelete}
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
            Add New Item
          </Button>
        </Box>
      ) : (
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
            Add New Item
          </Button>
        </Box>
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
          rows={mockTeam}
          // pageSize="5"
          columns={userColumns}
          // filterMode="server"
          onFilterModelChange={handleFilterModelChange}
          onRowSelectionModelChange={(newSelection) =>
            handleSelectionChange(newSelection)
          }
          components={{ Toolbar: GridToolbar }}
          sx={{ width: "98" }}
          loading={loading}
          // paginationMode="server"
          pageSizeOptions={[1, 10, 20, 50, 100]}
        />
      </Box>

      <AddModal
        open={openAddModal}
        handleClose={handleCloseAddModal}
        handleSave={handleSaveNewRow}
        formInputs={formInputs}
        columns={userColumns}
      />
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
