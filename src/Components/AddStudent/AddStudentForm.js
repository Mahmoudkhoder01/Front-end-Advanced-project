import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./AddStudentForm.module.css";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import Classes from "./AddStudentForm.module.css";
import TextField from "@mui/material/TextField";

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
  "@media (max-width: 768px)": {
    width: "95%",
    maxWidth: "none",
  },
};

export default function AddStudentForm(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const locale = "en-US";

  const [selectedFile, setSelectedFile] = useState(null);

  const currentDate = new Date();
  const enrollmentDate = currentDate.toISOString().slice(0, 10);
  console.log(enrollmentDate);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateFormat, setSelectedDateFormat] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const originalDate = date.$d;
    console.log(originalDate);
    const transformedDate = originalDate.toISOString().slice(0, 10);
    console.log(transformedDate);
    setSelectedDateFormat(transformedDate);
    console.log(selectedDateFormat);
  };

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  function handleSubmit(event) {
    event.preventDefault();

    // retrieve the input values from the form fields
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;

    let newStudent = new FormData();
    newStudent.append("first_name", firstName);
    newStudent.append("last_name", lastName);
    newStudent.append("email", email);
    newStudent.append("phone_number", phone);
    newStudent.append("section_id", props.selectedSectionId);
    newStudent.append("birth_date", selectedDateFormat);
    newStudent.append("enrollment_date", enrollmentDate);
    newStudent.append("image", selectedFile);
    console.log("Frontend", newStudent.entries());
    handleAddStudent(newStudent);
  }

  const handleAddStudent = async (studentData) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/students`,
        studentData
      );
      console.log(response.data);
      setOpen(false);
      props.regetDataAgain();
      toast.success("Student added succefully");
    } catch (error) {
      console.error(error);
      toast.error("Student added failed");
    }
  };

  return (
    <div>
      <button className={classes.addStudentBtn} onClick={handleOpen}>
        <FiPlus />
        Add Student
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Student
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} sm={12} item>
                <TextField
                  placeholder="Enter first name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  inputRef={firstNameRef}
                />
              </Grid>
              <Grid xs={12} sm={12} item>
                <TextField
                  placeholder="Enter last name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  inputRef={lastNameRef}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  type="email"
                  placeholder="Enter email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  inputRef={emailRef}
                />
              </Grid>
              <Grid xs={12} sm={12} item>
                <TextField
                  type="number"
                  placeholder="Enter phone number"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  required
                  inputRef={phoneRef}
                />
              </Grid>
              <Grid xs={12} sm={12} item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedDate}
                    label="Date of Birth"
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid xs={12} sm={12} item>
                <label htmlFor="myfile">Select a file:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileInputChange}
                  className={Classes.filesInput}
                />
              </Grid>
              <Grid className={classes.add} item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  className={Classes.addButton}
                >
                  Add New Student
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
