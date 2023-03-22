import React from "react";
import classes from "./StudentCard.module.css";
import { MdDeleteOutline } from "react-icons/md";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import StudentEditCard from "../editstudent/editstudent";
import InfoIcon from "@mui/icons-material/Info";

import axios from "axios";
import {
  MdPhoneEnabled,
  MdOutlineEmail,
  MdOutlineDateRange,
} from "react-icons/md";
import { toast } from "react-toastify";
import StudentDeleteCard from "../deleteStudent/deleteStudent";

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
  const [deleted, setDeleted] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {!deleted && (
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
              <h4>
                {props.student.first_name} {props.student.last_name}
              </h4>
              <StudentDeleteCard
                rowId={props.student.id}
                regetData={props.regetDataAgain}
              />
              <StudentEditCard
                className={classes.edit}
                student={props.student}
                setStudent={props.setStudentData}
                regetData={props.regetDataAgain}
              />
              <IconButton onClick={handleOpen}>
                <InfoIcon sx={{ color: "#5541D7" }} />
              </IconButton>
            </div>
            <div className={classes.studentDetails}>
              <div>
                <p>
                  <span className={classes.studentClass}>
                    {props.gradeName}
                  </span>
                  <span className={classes.studentSection}>
                    {props.sectionName}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
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
