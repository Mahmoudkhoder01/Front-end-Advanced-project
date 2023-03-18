import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Classes from "../Admins/admin.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading/loading";
import AddSectionForm from "../../Components/addSection/addSection";
import SectionEditCard from "../../Components/editSection/editSection";
import SectionDeleteCard from "../../Components/deleteSection/deletesection";
import Pagination from "../../Components/paginantion/pagination";
import AttendanceRadioButtons from "../../Components/attendanceRadioButton/attendanceRadioButton";
import SelectButton from "../../Components/Select/select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
  const [value, setValue] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState([]);
  const [page, setPage] = useState(1);

  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState("");

  const [attendanceBysectionId, setAttendanceBysectionId] = useState([]);
  const [attendanceByDate, setAttendanceByDate] = useState([]);

  const getGrades = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/grade`);
      setGrades(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSections = async (grade_id) => {
    setSelectedSectionId(grade_id);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/section/grade/${grade_id}`
      );
      setSections(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataByPagination = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/students/section/${selectedSectionId}/pagination?page=${page}`
      );
      setData(response.data.message.data);
      setCounter(response.data.message);
      setIsLoading(true);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getAttendance = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/attendance/section/${selectedSectionId}`
      );
      setAttendanceBysectionId(res.data.message);
      filterAttendanceByDate(res.data.message);
      console.log(res.data.message);
      console.log(attendanceBysectionId);
    } catch (err) {
      console.log(err);
    }
  };

  const filterAttendanceByDate = (data) => {
    let filtered = data.filter(
      (status) => status.attendance_date === value.$d.toISOString().slice(0, 10)
    );
    setAttendanceByDate(filtered);
  };

  // const matchStudentAttend = (id) =>{
  //  let studentAtten =   attendanceByDate.filter(attendance =>attendance.student_id === id)
  // }

  useEffect(() => {
    fetchDataByPagination();
  }, [page]);

  useEffect(() => {
    getGrades();
  }, []);

  useEffect(() => {
    getAttendance();
  }, [selectedSectionId]);

  const handlePageChange = (event, value) => {
    setPage(parseInt(event.target.textContent));
  };
  console.log(data);
  console.log(attendanceBysectionId);
  console.log(attendanceByDate);
  console.log(value.$d.toISOString().slice(0, 10));
  return (
    <>
      <div>
        <SelectButton
          labelName="Class"
          options={grades}
          getSections={getSections}
        />
        <SelectButton
          labelName="Section"
          options={sections}
          getStudents={fetchDataByPagination}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Date"
              defaultValue={dayjs()}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      {isLoading ? (
        <>
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
              <TableHead>Attendance</TableHead>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>FIRST NAME</StyledTableCell>
                  <StyledTableCell>LAST NAME</StyledTableCell>
                  <StyledTableCell>TAKE ATTENDANCE</StyledTableCell>
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
                    <StyledTableCell>{row.first_name}</StyledTableCell>
                    <StyledTableCell>{row.last_name}</StyledTableCell>
                    <StyledTableCell>
                    {/* <AttendanceRadioButtons /> */}
                      <AttendanceRadioButtons attendanceByDate={attendanceByDate} studentId={row.id} />
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.created_at.slice(0, 20)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.updated_at.slice(0, 20)}
                    </StyledTableCell>
                    <StyledTableCell style={{ display: "flex" }}>
                      <SectionEditCard
                        adminValue={row.name}
                        emailValue={row.email}
                        rowId={row.id}
                        regetData={fetchDataByPagination}
                      />
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
