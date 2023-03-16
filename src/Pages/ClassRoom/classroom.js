import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import GradeIcon from '@mui/icons-material/Grade';
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import "./classroom.css";
import postData from "./create.js";
// import Read from "./read.js";
import Update from "./update";
import { Button, Form } from "semantic-ui-react";
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';




function formatDate(dateString) {
  const createdDate = new Date(dateString);
  return `${createdDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })} 
  ${createdDate.toLocaleDateString("en-US")}`;
}
const columns = [
  // { field: 'id', headerName: 'ID', width: 70 },

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
          onClick={onClickDelete}
          
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
        //  onClick={() =>    }
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
            document.querySelector("#modal").showModal();
          }}
        />
      </Fab>
    ),
  },
];

export default function Classroom() {
  const [names, setNames] = useState([]);

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

  const onDelete = () => {
   
  };


  // const onClickDelete = () => {
  //   () => {
  //     alert();
  //     onDelete();
  //   }
  // };

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



<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>








    </Box>
  );
}
