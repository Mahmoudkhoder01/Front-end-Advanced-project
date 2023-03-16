import React from "react";
import { MdModeEdit, MdDeleteOutline } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
// import classes from "./AddStudentForm.module.css";
import Grid from "@mui/material/Grid";
import axios from "axios";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function EditStudentForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <div>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <button onClick={handleOpen}>
          <IconButton aria-label="edit">
            <MdModeEdit />
          </IconButton>
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Student's Data
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter first name"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter last name"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
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
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
