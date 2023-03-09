import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "grade",
    headerName: "grade",
    width: 150,
    editable: true,
  },
  {
    field: "icon",
    headerName: "icon",
    width: 150,
    editable: true,
  },
];

const rows = [
  { id: 1, grade: "Snow", icon: "Jon" },
  { id: 2, grade: "Lannister", icon: "Cersei" },
  { id: 3, grade: "Lannister", icon: "Jaime" },
  { id: 4, grade: "Stark", icon: "Arya" },
  { id: 5, grade: "Targaryen", icon: "Daenerys" },
  { id: 6, grade: "Melisandre", icon: "null" },
  { id: 7, grade: "Clifford", icon: "Ferrara" },
  { id: 8, grade: "Frances", icon: "Rossini" },
  { id: 9, grade: "Roxie", icon: "Harvey" },
];

export default function DataGridDemo() {
  return (
    <div
      sx={{
        color: "success.dark",
        display: "inline",
        fontWeight: "bold",
        mx: 0.5,
        fontSize: 14,
        paddingLeft: '100rem',
        background:"white"
      }}
    >
      <Box
        sx={{
          height: 400,
          width: "50%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={
            {
              // background: "white",
              // display:"flex",
              // justifyContent:"center",
              // alignContent:"center",
              // color: 'success.dark',
              // display: 'inline',
              // fontWeight: 'bold',
              // mx: 0.5,
              // fontSize: 14,
              // paddingLeft:25,
            }
          }
        />
      </Box>
    </div>
  );
}
