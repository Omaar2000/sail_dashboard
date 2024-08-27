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

const AddModal = ({ open, handleClose, handleSave, formInputs, columns }) => {
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
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add New Row
        </Typography>
        <Box>
          {columns.map((column) => (
            <React.Fragment key={column.field}>
              {column.field === "name" && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              )}
              {column.field === "phone" && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              )}
              {column.field === "access" && (
                <FormControl
                  fullWidth
                  required={column.required}
                  margin="normal"
                >
                  <InputLabel required id="access-label">
                    Access
                  </InputLabel>
                  <Select
                    labelId="access-label"
                    name="access"
                    value={formData.access}
                    onChange={handleChange}
                    label="Access"
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="superAdmin">SuperAdmin</MenuItem>
                  </Select>
                </FormControl>
              )}
              {column.field === "age" && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              )}
              {column.field === "email" && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              )}
              {errors[column.field] && column.field !== "edit" && (
                <Typography color="error">{errors[column.field]}</Typography>
              )}
              {/* {column.field === "phone" && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              )}
              {column.field === "phone" && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              )}
              {column.field === "phone" && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              )}
              {column.field === "phone" && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              )} */}
            </React.Fragment>
          ))}
        </Box>
        {/* 
        <Box display={"flex"} sx={{ gap: "25px" }}>
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <FormControl fullWidth required margin="normal">
            <InputLabel required id="access-label">
              Access
            </InputLabel>
            <Select
              labelId="access-label"
              name="access"
              value={formData.access}
              onChange={handleChange}
              label="Access"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="superAdmin">SuperAdmin</MenuItem>
            </Select>
          </FormControl>
        </Box> */}

        <Button variant="contained" color="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default AddModal;
