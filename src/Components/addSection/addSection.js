import React from "react";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "../AddStudent/AddStudentForm.module.css";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddSectionForm(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [section, setSection] = useState({
    section_description: "",
    capacity: "",
    grade: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setSection((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddSection = async (sectionData) => {
    try {
      await axios
        .post(`http://localhost:8000/api/section`, sectionData)
        .then(async (response) => {
          setOpen(false);
          // props.regetData();
          console.log("Hello world");
          console.log(await props.regetData());
          toast.success("Section added succefully");
        }).then(()=>{props.regetData(props.gradeId);});
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  
  const formHandleSubmit = (event) => {
    event.preventDefault();
    let newSection = new FormData();
    newSection.append("section_description", section.section_description);
    newSection.append("capacity", section.capacity);
    newSection.append("grade", props.gradeId);
    handleAddSection(newSection);
  };

  return (
    <>
      <div>
        <button
          className={classes.addStudentBtn}
          onClick={handleOpen}
        >
          <FiPlus />
          Add Section
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New Section
            </Typography>
            <form onSubmit={formHandleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} item>
                  <TextField
                    placeholder="Enter Section description"
                    name="section_description"
                    value={section.section_description}
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
                    value={section.capacity}
                    placeholder="Enter section capacity"
                    label="capacity"
                    variant="outlined"
                    onChange={handleFormChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" className={classes.addButton} >
                    Add New Section
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
        <ToastContainer />
      </div>
    </>
  );
}
