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
import { useEffect, useState } from "react";
import axios from "axios";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element"; 


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


defineElement(lottie.loadAnimation);
function createData(section, capacity, date, edit, Delete) {
  return { section, capacity, date, edit, Delete };
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
      const response = await axios.get("http://localhost:8000/api/section");
      setData(response.data.message);
      setIsLoading(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <TableContainer
          component={Paper}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
        >
          <Table>
            <TableHead>Section</TableHead>
            <TableHead>
              <TableRow>
                <StyledTableCell>Capacity</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <TableCell align="right">{row.capacity}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.edit}</TableCell>
                  <TableCell align="right">{row.Delete}</TableCell>
                  <StyledTableCell>
                  <IconButton aria-label="edit"></IconButton>
                  <lord-icon src="https://cdn.lordicon.com/jmkrnisz.json"trigger="hover"style={{width:"30px",height:"30px"}}></lord-icon>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1 style={{marginLeft:"350px"}}>Loading</h1>
      )}
    </>
  );
};

export default FixedTables;