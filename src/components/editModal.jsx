import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddModal from "./addModal";
import { userColumns } from "../data/mockData";

const EditModal = ({
  openAddModal,
  handleClose,
  handleSave,
  formInputs,
  columns,
}) => {
  const filteredFormData = Object.keys(formInputs)
    .filter((key) => columns.some((column) => column.field === key))
    .reduce((obj, key) => {
      obj[key] = formInputs[key];
      return obj;
    }, {});

  const [formData, setFormData] = useState(filteredFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSaveClick = () => {
  //   handleSave(formData);
  //   setFormData(filteredFormData);
  //   handleClose();
  // };

  const handleSaveClick = () => {
    const hasErrors = validateForm();
    console.log(!Object.keys(hasErrors).length);
    if (!Object.keys(hasErrors).length) {
      handleSave(formData);
      handleClose();
      setFormData(filteredFormData);
    }
  };

  const validateForm = () => {
    const validationErrors = columns.reduce((acc, column) => {
      if (
        column.required &&
        (!formData[column.field] || formData[column.field].trim() === "")
      ) {
        acc[column.field] = `${column.headerName} is required`;
      }
      return acc;
    }, {});
    setErrors(validationErrors);
    return validationErrors;
  };

  return (
    <>
      <AddModal
        open={openAddModal}
        handleClose={handleClose}
        handleSave={handleSaveClick}
        formInputs={formInputs}
        columns={userColumns}
      />
    </>
  );
};

export default EditModal;
