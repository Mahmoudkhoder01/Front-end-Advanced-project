import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import { MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
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

function createData(id, name,email, craeted_at, amount, updated_at) {
  return {
    id,
    name,
    email,
    craeted_at,
    amount,
    updated_at,
  };
}

const rowsData = [];
const filterOptions = [
  { label: "All", value: "all" },
  { label: "Incomes", value: "inc" },
  { label: "Expenses", value: "exp" },
];

const FixedTables = () => {
  const [filterOption, setFilterOption] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("id");
  const [rows, setRows] = React.useState([...rowsData]);
  // const [rows, setRows] = React.useState([...rowsDataFix])
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleEditRow = (id) => {
    const index = rows.findIndex((row) => row.id === id);
    if (index !== -1) {
      const rowToEdit = rows[index];
      console.log(`Editing row with id ${id}:`, rowToEdit);
    }
  };

  const handleDeleteRow = (id) => {
    const index = rows.findIndex((row) => row.id === id);
    if (index !== -1) {
      const rowToDelete = rows[index];
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
      console.log(`Deleting row with id ${id}:`, rowToDelete);
    }
  };

  const filteredRows =
    filterOption === "all"
      ? rows
      : rows.filter((row) => row.type === filterOption);

  const sortedRows = filteredRows.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    return 0;
  });

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
        <AddAdminForm/>
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
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell>Updated At</StyledTableCell>
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
                  <StyledTableCell style={{display: "flex"}}>
                    <AdminEditCard onClick={() => handleEditRow(row.id)}/>
                    <AdminDeleteCard onClick={() => handleDeleteRow(row.id)}/>
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
