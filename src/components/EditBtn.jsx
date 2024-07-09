import { Button } from "@mui/material";
import EditModal from "./editModal";
import { useState } from "react";
import { mockDataTeam, userColumns } from "../data/mockData";
import AddModal from "./addModal";

const EditBtn = ({ row }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [data, setData] = useState([]);
  const handleAddClick = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleSaveNewRow = (newRow) => {
    const updatedData = [
      ...mockDataTeam,
      { id: mockDataTeam.length + 1, ...newRow },
    ];
    setData(updatedData);
  };
  console.log(row);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={handleAddClick}
      >
        Edit
      </Button>
      <AddModal
        open={openAddModal}
        handleClose={handleCloseAddModal}
        handleSave={handleSaveNewRow}
        formInputs={row}
        columns={userColumns}
      />
    </>
  );
};

export default EditBtn;
