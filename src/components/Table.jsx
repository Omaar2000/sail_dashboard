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
import { mockDataContacts, mockDataTeam } from "../data/mockData";
import { useState } from "react";
import { Link } from "react-router-dom";

const TableComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelectionChange = (rowSelectionModel) => {
    setSelectedItems(rowSelectionModel);
  };

  const keysArray = Object.keys(mockDataTeam[0]);
  console.log(keysArray);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="10px"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlined />}
            {access === "manager" && <SecurityOutlined />}
            {access === "user" && <LockOpenOutlined />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="10px" sx={{}}>
      {selectedItems.length !== 0 ? (
        <Link
          style={{
            textDecoration: "none",
            backgroundColor: "red",
            color: "white",
            padding: "8px 16px",
            fontSize: "18px",
          }}
        >
          Delete
        </Link>
      ) : (
        <></>
      )}
      <Box
        m="40px 0 0 0"
        // height="85vh"
        // sx={{
        // maxHeight: "10px",
        // maxWidth="100%"
        sx={{
          // maxHeight: "10px",
          height: "600px",
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
            color: `${colors.greenAccent[200]} !important`,
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
          rows={mockDataTeam}
          columns={columns}
          onRowSelectionModelChange={handleSelectionChange}
          components={{ Toolbar: GridToolbar }}
          sx={{ width: "98" }}
        />
      </Box>
    </Box>
  );

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
};

export default TableComponent;
