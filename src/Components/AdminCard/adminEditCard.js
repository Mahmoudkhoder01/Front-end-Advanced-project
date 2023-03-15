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

export default function AdminEditCard(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [selectedAdmin, setSelectedAdmin] = useState(null); // new state variable

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(props.rowId);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user");
      setData(response.data.message);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEdit = (event, id) => {
    event.preventDefault();
    console.log(id);

    axios
      .post(`http://localhost:8000/api/auth/edit/${props.rowId}`, {
        _method: "PATCH",
        name: updatedData.name,
        email: updatedData.email,
        password: updatedData.password,
      })
      .then((response) => {
        console.log(response);
        setUpdatedData({
          name: "",
          email: "",
          password: "",
        });
        setOpen(false);
        // fetchData();
      })
      .catch((error) => {
        console.log("Error editing admin", error);
      });
  };

  return (
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
            Edit Admin
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
              <Grid xs={12} sm={12} item>
                  <TextField
                    type="email"
                    name="email"
                    value={updatedData.email}
                    placeholder={props.emailValue}
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
                  value={updatedData.password}
                  placeholder={"Add new password"}
                  label="Password"
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
                >
                  Edit Admin
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
