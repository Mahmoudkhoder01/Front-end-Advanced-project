import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Classes from "./section.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AddSectionForm from "../../Components/addSection/addSection";
import SectionEditCard from "../../Components/editSection/editSection";
import SectionDeleteCard from "../../Components/deleteSection/deletesection";
import Pagination from "../../Components/paginantion/pagination";
import SelectButton from "../../Components/Select/select";

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
  const [counter, setCounter] = useState([]);
  const [page, setPage] = useState(1);

  const [grades, setGrades] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedGradeId, setSelectedGradeId] = useState("");

  const getGrades = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/grade`);
      setGrades(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataByPagination = async (grade_id) => {
    setSelectedGradeId(grade_id);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/section/${grade_id}/pagination?page=${page}`
      );
      setSections(response.data.message.data);
      setCounter(response.data.message);
      setIsLoading(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getAllSectionByGradeId = async () => {
    try {
      await axios
        .get(
          `http://localhost:8000/api/section/${selectedGradeId}/pagination?page=${page}`
        )
        .then((response) => {
          setAllSections(response.data.message.data);
          setCounter(response.data.message);
          console.log(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(allSections);
  console.log(selectedGradeId);

  useEffect(() => {
    fetchDataByPagination(selectedGradeId);
  }, [page]);

  useEffect(() => {
    getGrades();
  }, []);

  // useEffect(() => {
  //   getAllSectionByGradeId();
  // }, [selectedGradeId, page]);

  const handlePageChange = (event) => {
    setPage(parseInt(event.target.textContent));
  };

  console.log(sections);

  return (
    <>
      <div className={Classes.sectionPage}>
        <div className={Classes.sectionDropDowns}>
          <SelectButton
            labelName="Class"
            options={grades}
            getSections={fetchDataByPagination}
          />
          {isLoading ? (
            <AddSectionForm
              regetData={fetchDataByPagination}
              gradeId={selectedGradeId}
            />
          ) : null}
        </div>
        {isLoading ? (
          <>
            <TableContainer
              component={Paper}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
            >
              <Table>
                <TableHead></TableHead>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>SECTION DESCRIPTION</StyledTableCell>
                    <StyledTableCell>CAPACITY</StyledTableCell>
                    <StyledTableCell>CRAETED AT</StyledTableCell>
                    <StyledTableCell>UPDATET AT</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sections
                    ? sections.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell component="th" scope="row">
                            {row.id}
                          </StyledTableCell>
                          <StyledTableCell>
                            {row.section_description}
                          </StyledTableCell>
                          <StyledTableCell>{row.capacity}</StyledTableCell>
                          <StyledTableCell>
                            {row.created_at.slice(0, 10)}
                          </StyledTableCell>
                          <StyledTableCell>
                            {row.updated_at.slice(0, 10)}
                          </StyledTableCell>
                          <StyledTableCell style={{ display: "flex" }}>
                            <SectionEditCard
                              adminValue={row.name}
                              emailValue={row.email}
                              rowId={row.id}
                              regetData={fetchDataByPagination}
                              gradeId={selectedGradeId}
                            />
                            <SectionDeleteCard
                              rowId={row.id}
                              regetData={fetchDataByPagination}
                              gradeId={selectedGradeId}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : ""}
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
          <p className={Classes.beforeChoose}>
            Choose a Class to see the Sections
          </p>
        )}
      </div>
    </>
  );
};

export default FixedTables;
