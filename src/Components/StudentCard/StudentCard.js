import React from "react";
import classes from "./StudentCard.module.css";
import { MdModeEdit, MdDeleteOutline } from "react-icons/md";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import axios from "axios";
import {
  MdPhoneEnabled,
  MdOutlineEmail,
  MdOutlineDateRange,
} from "react-icons/md";


// https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
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

export default function StudentCard(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleDelete = async (student_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/students/${student_id}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className={classes.studentCard}> 
        <div>
          <img
            className={classes.studentAvatar}
            src={`http://localhost:8000/storage/${props.student.headshot}`}
            alt="profile"
          />
        </div>
        <div className={classes.student}>
          <div className={classes.studentName}>
            <h3>{props.student.first_name} {props.student.last_name}</h3>
            <div>
              <IconButton aria-label="edit">
                <MdModeEdit />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => handleDelete(props.student.id)}>
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
          {props.student.first_name} {props.student.last_name}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <MdOutlineDateRange /> {props.student.birth_date}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <MdOutlineEmail /> {props.student.email}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <MdPhoneEnabled /> {props.student.phone_number}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
