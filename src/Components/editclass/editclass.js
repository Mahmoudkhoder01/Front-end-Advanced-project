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

export default function ClassEditCard(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEdit = (event, id) => {
    event.preventDefault();
    console.log(id);

    axios
      .post(`http://localhost:8000/api/grade/${props.rowId}`, {
        _method: "PUT",
        name: updatedData.name,
      })
      .then((response) => {
        console.log(response);
        setUpdatedData({
          name: "",
        });
        setOpen(false);
        props.regetData();
        toast.success("Class edited successfully");
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
              Edit Class
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} item>
                  <TextField
                    placeholder={props.adminValue}
                    name="name"
                    value={updatedData.name}
                    label="Name"
                    onChange={handleFormChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                    className={classes.addButton}
                  >
                    Edit Class
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
