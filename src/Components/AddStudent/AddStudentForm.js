import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import dayjs from "dayjs";

import { MdOutlinePersonOutline } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./AddStudentForm.module.css";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { MdCameraEnhance } from "react-icons/md";
import { MdClear } from "react-icons/md";
import Stack from "@mui/material/Stack";

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
// import AccountCircle from '@mui/icons-material/AccountCircle';

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
  const classNameRef = useRef(null);
  const sectionNameRef = useRef(null);
  const dobRef = useRef(null);

  const locale = "en-US"; // or your preferred locale
  const dateAdapter = new AdapterDayjs({ locale });
  //const imageRef = useRef(null);

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
    // do something with the selected file
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  function handleRemove() {
    setImageUrl("");
  }

  function handleSubmit(event) {
    event.preventDefault(); // prevent the default form submission behavior

    // retrieve the input values from the form fields
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    // const className = classNameRef.current.value;
    // const sectionName = sectionNameRef.current.value;
    // const dateOfBirth = dobRef.current.value; // assuming the DatePicker sets the value as a string
    const imageFile = selectedImage;
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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

          {/* <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <MdOutlinePersonOutline sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="With sx" variant="standard" />
          </Box> */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  placeholder="Enter first name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  inputRef={firstNameRef}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  placeholder="Enter last name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  inputRef={lastNameRef}
                />
              </Grid>
              <Grid item xs={6}>
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
              <Grid xs={12} sm={6} item>
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
                {/* <DatePicker label="Basic date picker" /> */}
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    inputRef={dobRef}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider> */}
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedDate}
                    label="Date of Birth"
                    onChange={handleDateChange}
                    renderInput={(params) => (<TextField {...params} />)}
                  />
                </LocalizationProvider> */}
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
                />
                {/* <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                <label htmlFor="select-image">
                  <Button variant="contained" color="primary" component="span">
                    Upload Image
                  </Button>
                </label>
                {imageUrl && selectedImage && (
                  <Box mt={2} textAlign="left">
                    <div>Image Preview:</div>
                    <img
                      src={imageUrl}
                      alt={selectedImage.name}
                      height="200px"
                    />
                    <IconButton aria-label="delete" onClick={handleRemove}>
                      <MdClear />
                    </IconButton>
                  </Box>
                )} */}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
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
