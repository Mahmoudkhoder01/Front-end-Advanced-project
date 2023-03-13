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

const columns = [
  // { field: "id", headerName: "ID", width: 50 },
  {
    field: "grade",
    headerName: "Grades",
    width: 800,
    editable: true,

    renderCell: (params) => (
      <Tooltip
        title={<h1 style={{ fontSize: "1rem" }}>Created @</h1>}
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
    field: "edit",
    headerName: "",
    width: 100,
    editable: true,
    align: "center",
    sortable: false,
    renderCell: (params) => (
      <Fab color="blue" size="small" aria-label="edit">
        <EditIcon onClick={() => Update()} />
      </Fab>
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

    renderCell: (params) => (
      <Fab color="blue" size="small" aria-label="delete">
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
          onClick={() =>
            alert(`Do you really want to remove grade ${params.id}?`)
          }
        />{" "}
      </Fab>
    ),
  },
  {
    headerName: (
      <Fab color="blue" size="large" aria-label="add">
        <AddIcon
          style={{ fontSize: "2.5rem", fontWeight: "bolder", margin: "2rem" }}
          onClick={() =>
            //  alert(`add grade ?`)}
            postData()
          }
        />
      </Fab>
    ),
    sortable: false,
  },
];

// const rows = [
//   { id: 1, name: "grade 1" },
//   { id: 2, name: "grade 1" },
//   { id: 3, name: "grade 1" },
//   { id: 4, name: "grade 1" },
//   { id: 5, name: "grade 1" },
//   { id: 6, name: "grade 1" },
//   { id: 7, name: "grade 1" },
//   { id: 8, name: "grade 1" },
//   { id: 9, name: "grade 1" },
// ];

export default function Classroom() {
  const [name, setName] = useState([]);
  // const [grade_id, setGrade_id] = useState();


  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/grade`)
      .then((response) => {
        setName(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(name);
  if (!name) return <h1> loading </h1>;
 
  return (
    <div key={name.id} >
      <Box
        sx={{
          height: "60%",
          width: "72%",
        }}
      >
        <DataGrid
          rows={name}
          columns={columns}
          // sortModel={[]}
          // disableColumnMenu
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick={false}
          sx={{
            borderRadius: "1rem",
          }}
        />
      </Box>
    </div>
  );
}
