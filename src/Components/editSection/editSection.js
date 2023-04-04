import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import classes from "../AddStudent/AddStudentForm.module.css";

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

export default function SectionEditCard(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updatedData, setUpdatedData] = useState({
    section_description: "",
    capacity: "",
    grade: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEdit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:8000/api/section/${props.rowId}`, {
        _method: "PATCH",
        section_description: updatedData.section_description,
        capacity: updatedData.capacity,
      })
      .then((response) => {
        console.log(response);
        setUpdatedData({
          section_description: "",
          capacity: "",
          grade: "",
        });
        setOpen(false);
        props.regetData(props.gradeId);
        toast.success("Section edited successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log("Error editing admin", error);
        toast.error(error.response.data);
      });
  };

  return (
    <>
      <div>
        <IconButton onClick={handleOpen}>
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
              Edit Section
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} item>
                  <TextField
                    placeholder="Enter Section description"
                    name="section_description"
                    value={updatedData.section_description}
                    label="Section Description"
                    onChange={handleFormChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    type="text"
                    name="capacity"
                    value={updatedData.capacity}
                    placeholder="Enter section capacity"
                    label="capacity"
                    variant="outlined"
                    onChange={handleFormChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                    className={classes.addButton}
                  >
                    Edit Section
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
