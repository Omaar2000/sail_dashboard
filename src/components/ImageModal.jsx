import {
  Backdrop,
  Box,
  ClickAwayListener,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ImageModal = ({ imageUrl }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <img
        src={imageUrl}
        alt="User Avatar"
        style={{ width: "50px", height: "50px", cursor: "pointer" }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Adjust height as needed
        }}
      >
        <Box>
          <img
            src={imageUrl}
            alt="Full Size"
            style={{ maxWidth: "80vw", maxHeight: "80vh" }} // Adjust size as needed
          />
        </Box>
      </Modal>
    </>
  );
};

export default ImageModal;
