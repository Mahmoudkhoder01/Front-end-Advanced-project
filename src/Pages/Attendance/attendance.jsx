import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Classes from "../Attendance/attendance.module.css";
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
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
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
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState("");

  const [attendances, setAttendances] = useState([]);
  const [records, setRecords] = useState([]);

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

  const fetchDataByPagination = async (sectionId) => {
    if (!sectionId) {
      throw new Error("Section ID is required");
    }
    setSelectedSectionId(sectionId);
    console.log("in fetchDataByPagination", selectedSectionId);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/students/section/${sectionId}/pagination?page=${page}`
      );
      setData(response.data.message.data);
      setCounter(response.data.message);
      setIsLoading(true);
      console.log("students response by pagination", response);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchData = async (sectionId) => {
    console.log("in fetchData", selectedSectionId);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/students/section/${sectionId}`
      );
      setStudents(response.data.message);
      console.log("students response", response.data.message);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getAttendance = async () => {
    const date = value.$d.toISOString().slice(0, 10);
    console.log(date);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/attendance/bydate&section/${selectedSectionId}/${date}`
      );
      setAttendances(res.data.message);
      // filterAttendanceByDate(res.data.message);
      attendanceRecords();
      console.log("new", res.data.message);
      // console.log(attendances);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTakeAttendance = async () => {
    try {
      console.log("records before submit ", records);
      const response = await axios
        .post(`http://localhost:8000/api/attendanceforAll`, {
          attendances: records,
        })
        .then(() => {
          getAttendance();
        });
    } catch (error) {
      console.error(error);
    }
  };

  // create records for all students
  function attendanceRecords() {
    let attendanceRecords = [];
    if (students.length !== 0) {
      students.map((student) => {
        attendanceRecords.push({
          attendance_date: value.$d.toISOString().slice(0, 10),
          section_id: student.section_id,
          status: "",
          student_id: student.id,
        });
      });
    }

    setRecords(attendanceRecords);
  }

  // save attendance records for all students
  function handleAttendanceChange(studentId, status) {
    // update attendance status for student with the given ID
    const updatedAttendance = records.map((studentAttendance) => {
      if (studentAttendance.student_id === studentId) {
        return { ...studentAttendance, status: status };
      } else {
        return studentAttendance;
      }
    });
    setRecords(updatedAttendance);
    console.log("hey");
  }

  //edit attendance record
  const editStudentAttendance = async (studentId) => {
    const record = records?.find(
      (attendRecord) => attendRecord.student_id === studentId
    );
    const attendance = attendances?.find(
      (attendance) => attendance.student_id === studentId
    );

    console.log("edited record before submit", record);
    console.log("attendance id", attendance.id);
    try {
      console.log("records before submit ", record);
      const response = await axios
        .post(`http://localhost:8000/api/attendance/${attendance.id}`, {
          status: record.status,
          _method: "Patch",
        })
        .then((response) => {
          console.log(response);
          getAttendance();
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGrades();
  }, []);

  useEffect(() => {
    fetchDataByPagination(selectedSectionId);
  }, [page]);

  useEffect(() => {
    getAttendance();
  }, [selectedSectionId, value]);

  useEffect(() => {
    console.log("students in attendanceRecords() use effect", students);
    attendanceRecords();
  }, [students]);

  useEffect(() => {
    console.log(records);
  }, [attendances, records]);

  const handlePageChange = (event, value) => {
    setPage(parseInt(event.target.textContent));
  };

  // useEffect(() => {
  //   setDisableBtns(attendances?.length !== 0)
  // }, [attendances]);

  // useEffect(() => {
  //   getAttendance();
  // }, [value]);
  // useEffect(() => {
  //   getAttendance();
  // }, [selectedSectionId]);

  // useEffect(() => {
  //   fetchData();
  // }, [selectedSectionId]);

  // console.log("student", data);
  // console.log(attendances);
  // console.log(records);
  // console.log(value.$d.toISOString().slice(0, 10));

  return (
    <>
      <div className={Classes.attendance}>
        <div className={Classes.attendanceDropDown}>
          <SelectButton
            labelName="Class"
            options={grades}
            getSections={getSections}
          />
          <SelectButton
            labelName="Section"
            options={sections}
            getStudents={fetchDataByPagination}
            fetchData={fetchData}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              // sx={{ marginTop: 4, marginLeft: 10 }}
            >
              <DatePicker
                label="Date"
                defaultValue={dayjs()}
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          {isLoading ? (
            <button className={Classes.saveAttendance} onClick={handleTakeAttendance}>
              <SaveIcon />
              Save
            </button>
          ) : null}
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
              <Table sx={{marginTop: 3}}>
                <TableHead></TableHead>
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
                        <AttendanceRadioButtons
                          attendances={attendances}
                          studentId={row.id}
                          handleAttendanceChange={handleAttendanceChange}
                          records={records}
                          // setDisableBtns={setDisableBtns}
                          // disableBtns={disableBtns}
                          editStudentAttendance={editStudentAttendance}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.created_at.slice(0, 20)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.updated_at.slice(0, 20)}
                      </StyledTableCell>
                      <StyledTableCell style={{ display: "flex" }}>
                        {/* <SectionEditCard
                          adminValue={row.name}
                          emailValue={row.email}
                          rowId={row.id}
                          regetData={fetchDataByPagination}
                        /> */}

                        {/* <IconButton onClick={handleEditAttendance }>
                          <EditIcon />
                        </IconButton> */}
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
          <p className={Classes.beforeChoose}>
            Choose a Class and a Section to take attendance
          </p>
        )}
      </div>
    </>
  );
};

export default FixedTables;
