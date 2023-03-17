import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading/loading";
import Pagination from "../../Components/paginantion/pagination";
import Classes from "./classroom.module.css";
import AddClassForm from "../../Components/addclass/addclass";
import ClassEditCard from "../../Components/editclass/editclass";
import ClassDeleteCard from "../../Components/deleteclass/deleteclass";

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
  const [counter, setCounter] = useState([]);
  const [page, setPage] = useState(1);

  const fetchDataByPagination = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/grade/pagination?page=${page}`
      );
      setData(response.data.message.data);
      setCounter(response.data.message);
      setIsLoading(true);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchDataByPagination();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(parseInt(event.target.textContent));
  };

  return (
    <>
      {isLoading ? (
        <>
          <AddClassForm regetData={fetchDataByPagination} />
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
              <TableHead>Classes</TableHead>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>NAME</StyledTableCell>
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
                    <StyledTableCell>{row.created_at}</StyledTableCell>
                    <StyledTableCell>{row.updated_at}</StyledTableCell>
                    <StyledTableCell style={{ display: "flex" }}>
                      <ClassEditCard
                        adminValue={row.name}
                        rowId={row.id}
                        regetData={fetchDataByPagination}
                      />
                      <ClassDeleteCard rowId={row.id} regetData={fetchDataByPagination} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            onChange={handlePageChange}
            changepage={page}
            pagesCounter={counter.last_page}
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FixedTables;
