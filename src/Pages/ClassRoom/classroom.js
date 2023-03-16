import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import "./classroom.css";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";

//const funct = () => axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

function formatDate(dateString) {
  const createdDate = new Date(dateString);
  return `${createdDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })} 
  ${createdDate.toLocaleDateString("en-US")}`;
}

export default function Classroom() {
  const [names, setNames] = useState([]);

  const columns = [
    {
      field: "name",
      headerName: "Grades",
      width: 800,
      editable: true,
      key: "name",
      renderCell: (params) => (
        <Tooltip
          title={
            <h1 style={{ fontSize: "1rem" }}>
              Created @ {formatDate(params.row.created_at)}
            </h1>
          }
          arrow
          placement="right"
        >
          <div
            style={{
              fontWeight: "bolder",
              marginLeft: "4rem",
              fontSize: "1.25rem",
            }}
          >
            {params.value}
          </div>
        </Tooltip>
      ),
    },

    {
      field: "delete",
      headerName: "",
      type: "number",
      width: 100,
      align: "center",
      editable: true,
      sortable: false,
      key: "delete",
      renderCell: (params) => (
        <Fab color="black" size="small" aria-label="delete">
          <DeleteForeverIcon
            style={{
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "red";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "black";
            }}
            onClick={() => {
              deleteName(params.id);
            }}
            //  () =>showDeleteModal()
            //  ${params.id}
          />
        </Fab>
      ),
    },

    {
      field: "edit",
      headerName: "",
      width: 100,
      editable: true,
      align: "center",
      sortable: false,
      key: "edit",
      renderCell: (params) => (
        <Fab color="blue" size="small" aria-label="edit">
          <EditIcon
          // onClick={() =>  ()  }
          />
        </Fab>
      ),
    },
    {
      field: "add",
      headerName: "",
      width: 100,
      sortable: false,
      key: "add",
      renderHeader: () => (
        <Fab color="blue" size="large" aria-label="add">
          <AddIcon
            style={{ fontSize: "2.5rem", fontWeight: "bolder", margin: "2rem" }}
            onClick={() => {
              document.querySelector("#add").showModal();
            }}
          />
        </Fab>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/grade`);
      setNames(response.data.message);
      console.log(names);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [name, setName] = useState("");

  const postData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/grade`,
        {
          name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/grade/${id}`, {
        name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/grade/{id}`).then((response) => {
      // setPost(response.data);
    });
  }, []);


  const deleteName = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/grade/${id}`);
      alert("Post deleted!");
      setName(null);
    } catch (error) {
      console.log(error);
    }
  };
  
  if (!names) return <h1>loading</h1>;
  return (
    <Box
      sx={{
        height: "64.5%",
        width: "72%",
      }}
    >
      <DataGrid
        rows={names}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(name) => name.id}
      />

      <dialog id="add">
        <FormControl>
          <InputLabel htmlFor="my-input">
            Please enter the new grade here
          </InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            placeholder="Grade"
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText id="my-helper-text">
            You are adding a new grade.
          </FormHelperText>
          <Button
            onClick={postData}
            type="submit"
            variant="contained"
            size="small"
          >
            Add
          </Button>
        </FormControl>
      </dialog>

      <dialog id="edit">
        <FormControl>
          <InputLabel htmlFor="my-input">
            Please enter the new grade here
          </InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            placeholder="Grade"
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText id="my-helper-text">
            You are adding a new grade.
          </FormHelperText>
          <Button
            onClick={editData}
            type="submit"
            variant="contained"
            size="small"
          >
            Add
          </Button>
        </FormControl>
      </dialog>
    </Box>
  );
}
