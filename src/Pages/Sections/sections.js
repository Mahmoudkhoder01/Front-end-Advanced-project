// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import { DataGrid } from "@mui/x-data-grid";
// import Paper from "@mui/material/Paper";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import lottie from "lottie-web";
// import { defineElement } from "lord-icon-element";
// import { Sector } from "recharts";
// import Select from "../../Components/Select/select";
// import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import AddSectionForm from "../../Components/addSection/addSection";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import EditIcon from "@mui/icons-material/Edit";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#5541D7",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// defineElement(lottie.loadAnimation);
// function createData(section, capacity, date, edit, Delete) {
//   return { section, capacity, date, edit, Delete };
// }
// const columns = [
//   { field: "id", headerName: "section ID", width: 150 },
//   { field: "section_description", headerName: "Section", width: 150 },
//   { field: "capacity", headerName: "Capacity", width: 150 },
// ];

// // const FixedTables = () => {
// //   const [filterOption, setFilterOption] = React.useState("all");
// //   const [sortBy, setSortBy] = React.useState("id");
// //   const [rows, setRows] = React.useState([...rowsData]);
// //   // const [rows, setRows] = React.useState([...rowsDataFix])
// //   const handleFilterChange = (event) => {
// //     setFilterOption(event.target.value);
// //   };}

// const rowsData = [];
// const filterOptions = [
//   { label: "All", value: "all" },
//   { label: "Incomes", value: "inc" },
//   { label: "Expenses", value: "exp" },
// ];

// const FixedTables = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const [open, setOpen] = useState(false);
//   const BasicModal = () => {};
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   // const handleEditRow = (id) => {
//   //   const index = rows.findIndex((row) => row.id === id);
//   //   if (index !== -1) {
//   //     const rowToEdit = rows[index];
//   //     console.log(`Editing row with id ${id}:`, rowToEdit);
//   //   }
//   // };

//   // const handleDeleteRow = (id) => {
//   //   const index = rows.findIndex((row) => row.id === id);
//   //   if (index !== -1) {
//   //     const rowToDelete = rows[index];
//   //     const newRows = [...rows];
//   //     newRows.splice(index, 1);
//   //     setRows(newRows);
//   //     console.log(`Deleting row with id ${id}:`, rowToDelete);
//   //   }
//   // };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/section");
//       setData(response.data.message);
//       setIsLoading(true);
//       console.log(data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <>
//           <Select
//             labelName="Class"
//             backgroundColor="blue"
//             options={["Class A", "Class B", "Class C"]}
//           />
//           <TableContainer
//             component={Paper}
//             initialState={{
//               pagination: {
//                 paginationModel: { pageSize: 10, page: 0 },
//               },
//             }}
//           >
//             <div>
//         <AddSectionForm regetData={fetchData}/>
//             </div>
//           </TableContainer>
//           <DataGrid
//             style={{ margin: "20px" }}
//             columns={columns}
//             rows={data}
//           ></DataGrid>
//         </>
//       ) : (
//         <h1 style={{ marginLeft: "350px" }}>Loading</h1>
//       )}
//     </>
//   );
// };

// export default FixedTables;
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Classes from "./admin.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading/loading";
import AdminEditCard from "../../Components/AdminCard/adminEditCard";
import AdminDeleteCard from "../../Components/AdminCard/adminDeleteCard";
import AddAdminForm from "../../Components/addAdmin/addAdmin";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5541D7",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FixedTables = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

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

  return (
    <>
      {isLoading ? (
        <>
          <AddAdminForm regetData={fetchData}/>
          <TableContainer
            className={Classes.adminPage}
            component={Paper}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
          >
            <Table>
              <TableHead>Admins</TableHead>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>NAME</StyledTableCell>
                  <StyledTableCell>EMAIL</StyledTableCell>
                  <StyledTableCell>CRAETED AT</StyledTableCell>
                  <StyledTableCell>UPDATET AT</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.created_at}</StyledTableCell>
                    <StyledTableCell>{row.updated_at}</StyledTableCell>
                    <StyledTableCell style={{ display: "flex" }}>
                      <AdminEditCard
                        adminValue={row.name}
                        emailValue={row.email}
                        rowId={row.id}
                        regetData={fetchData}
                      />
                      <AdminDeleteCard rowId={row.id} regetData={fetchData} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FixedTables;