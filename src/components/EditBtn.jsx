import { Button } from "@mui/material";
import EditModal from "./editModal";
import { useState } from "react";
import { mockDataTeam, userColumns } from "../data/mockData";
import AddModal from "./addModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditBtn = ({ to, row }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to, { state: row });
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
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={handleClick}
      >
        {t("Edit")}
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
