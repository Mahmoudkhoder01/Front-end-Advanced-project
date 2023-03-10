import React from "react";
import classes from "./StudentCard.module.css";
import { MdModeEdit, MdDeleteOutline } from "react-icons/md";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import {
  MdPhoneEnabled,
  MdOutlineEmail,
  MdOutlineDateRange,
} from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function S() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={classes.studentCard}>
        <div>
          <img
            className={classes.studentAvatar}
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
            alt="profile"
          />
        </div>
        <div className={classes.student}>
          <div className={classes.studentName}>
            <h3>student name</h3>
            <div>
              <IconButton aria-label="edit">
                <MdModeEdit />
              </IconButton>
              <IconButton aria-label="delete">
                <MdDeleteOutline />
              </IconButton>
            </div>
          </div>
          <div className={classes.studentDetails}>
            <p>
              <span className={classes.studentClass}>class 1</span>
              <span className={classes.studentSection}> section 2</span>
            </p>
            <button className={classes.studentDetailsBtn} onClick={handleOpen}>
              details
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Student Name
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <MdOutlineDateRange />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <MdOutlineEmail /> studentt@gmail.com
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <MdPhoneEnabled />
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
