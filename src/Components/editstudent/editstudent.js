import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import classes from "./editstudent.module.css";
import { ToastContainer, toast } from "react-toastify";
import Classes from "../AddStudent/AddStudentForm.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function StudentEditCard(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updatedImageUrl, setUpdatedImageUrl] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birth_date: "",
    password: "",
    phone_number: "",
    enrollment_date: "",
  });
  console.log(props.student.id);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setUpdatedImageUrl(event.target.files[0]);
  };
  const handleEdit = (event, id) => {
    event.preventDefault();
    console.log(id);
    let updatedStudent = new FormData();
    updatedStudent.append("first_name", updatedData.first_name);
    updatedStudent.append("last_name", updatedData.last_name);
    updatedStudent.append("email", updatedData.email);
    updatedStudent.append("phone_number", updatedData.phone_number);
    updatedStudent.append("section_id", props.selectedSectionId);
    updatedStudent.append("birth_date", updatedData.birth_date);
    updatedStudent.append("enrollment_date", updatedData.enrollment_date);
    updatedStudent.append("image", updatedImageUrl);
    updatedStudent.append("_method", "PATCH");
    console.log("Frontend", updatedStudent.entries());

    axios
      .post(
        `http://localhost:8000/api/students/${props.student.id}`,
        updatedStudent
      )
      .then((response) => {
        console.log(response);
        setUpdatedData({
          first_name: "",
          last_name: "",
          email: "",
          birth_date: "",
          phone_number: "",
          enrollment_date: "",
          imageUrl: "",
        });
        setOpen(false);
        props.regetData();
        toast.success("Student edited successfully");
      })
      .catch((error) => {
        console.log("Error editing student", error);
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <div>
        <IconButton className={classes.edit} onClick={handleOpen}>
          <EditIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit student
            </Typography>
            <form>
              <Grid container spacing={3}>
                <Grid xs={12} sm={12} item sx={{ marginTop: 2 }}>
                  <TextField
                    name="first_name"
                    type="text"
                    value={updatedData.first_name}
                    label="FirstName"
                    onChange={handleFormChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    name="last_name"
                    type="text"
                    value={updatedData.last_name}
                    label="LastName"
                    onChange={handleFormChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    name="email"
                    value={updatedData.email}
                    label="email"
                    type="email"
                    onChange={handleFormChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    name="birth_date"
                    value={updatedData.birth_date}
                    onChange={handleFormChange}
                    variant="outlined"
                    type="date"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    name="phone_number"
                    value={updatedData.phone_number}
                    label="Phone"
                    type="text"
                    onChange={handleFormChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    name="enrollment_date"
                    value={updatedData.enrollment_date}
                    type="date"
                    onChange={handleFormChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <input
                    name="headshot"
                    // value={updatedImageUrl}
                    type="file"
                    onChange={handleImageChange}
                    variant="outlined"
                    fullWidth
                    required
                    className={`${classes.filesInput} ${Classes.filesInput}`}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                    className={Classes.addButton}
                  >
                    Edit student
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
}
