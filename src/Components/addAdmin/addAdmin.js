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
import TextField from "@mui/material/TextField";
import axios from "axios";
import Loading from "../Loading/loading";

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
  const [isLoading, setIsLoading] = useState(false);

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user");
      setData(response.data.message);
      setIsLoading(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setAdmin((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/auth/register", {
        name: admin.name,
        email: admin.email,
        password: admin.password,
      })
      .then((response) => {
        setAdmin({
          name: "",
          email: "",
          password: "",
        });
        console.log("added succesffully");
        setOpen(false);
        fetchData();
      })
      .catch((error) => {
        console.log("Error adding admin", error);
      });
  };

  return (
    <div style={{ marginTop: "4rem" }}>
      <button
        className={classes.addStudentBtn}
        style={{ transform: "translateX(88rem)" }}
        onClick={handleOpen}
      >
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
                  value={admin.name}
                  label="Name"
                  onChange={handleFormChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} sm={12} item>
                <TextField
                  type="email"
                  name="email"
                  value={admin.email}
                  placeholder="Enter admin email"
                  label="Email"
                  variant="outlined"
                  onChange={handleFormChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  name="password"
                  value={admin.password}
                  placeholder="Enter admin password"
                  label="Password"
                  onChange={handleFormChange}
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
