import React from "react";
import { useState, useEffect } from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "../AddStudent/AddStudentForm.module.css";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { MdCameraEnhance } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import axios from "axios";

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

export default function AddAdminForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
  })
  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = event.target;
    // const name = form.name.value;
    // const email = form.email.value;
    // const password = form.password.value;
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name: admin.name,
        email: admin.email,
        password: admin.password,
      }).then((response)=>{
        setAdmin({
          name: "",
          email: "",
          password: "",
        })
      });
      setOpen(false)
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  // axios
  //       .post(
  //         "http://localhost:8000/api/auth/section",
  //         {
  //           name: section.name,
  //           content: section.content,
  //           capacity: section.capacity,
  //           course_id: section.course_id,
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response.data);
  //         setData([...data, response.data]);
  //         setSection({
  //           name: "",
  //           content: "",
  //           capacity: "",
  //           course_id:""
  //         });

  return (
    <div style={{ marginTop: "4rem", transform: "translateX(88rem)" }}>
      <button className={classes.addStudentBtn} onClick={handleOpen}>
        <FiPlus />
        Add Admin
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Admin
          </Typography>
          <form>
            <Grid container spacing={1}>
              <Grid xs={12} sm={12} item>
                <TextField
                  placeholder="Enter admin name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} sm={12} item>
                <TextField
                  type="email"
                  name="email"
                  placeholder="Enter admin email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  name="password"
                  placeholder="Enter admin password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Add New Admin
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
