import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StatusRadio from "./StatusRadio";
import { DataGrid } from "@mui/x-data-grid";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  DateField,
  LocalizationProvider,
  DatePicker,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CoPresentIcon from "@mui/icons-material/CoPresent";

import axios from "axios";

const AttendanceContainer = styled.form`
  height: 80vh;
  overflow-y: auto;
`;
const HeadContainer = styled.div`
  margin: 15px;
  padding: 10px 40px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  @media only screen and (max-width: 1080px) {
    flex-direction: column;
    align-items: center;
  }
`;

const GridContainer = styled.div`
  min-height: 60vh;
`;

const DateText = styled.h3`
  font-size: 22px;
  font-weight: normal;
  align-self: center;
  text-transform: uppercase;
  margin: 0;
  white-space: nowrap;
  margin-right: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Attendance = () => {
  const navigate = useNavigate();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  const [selectedDate, setSelectedDate] = useState(today);
  const [students, setStudents] = useState([]);
  const [student_id, setStudent_id] = useState();
  const [grade, setgrade] = useState([]);
  const [Grade_id, setGrade_id] = useState();
  const [sections, setSections] = useState([]);
  const [section_id, setSection_id] = useState(undefined);
  const [disable, setDisable] = useState(false);
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "Student ID", width: 150 },
    {
      field: "first_name",
      headerName: "First Name",
      width: 160,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 300,
      // renderCell: (params) => {
      //   const date = selectedDate;
      //   const attendances = params.row.attendance;
      //   const attendance = attendances.find(
      //     (attendance) => attendance.date === date
      //   );
      //   if (attendance) {
      //     return (
      //       <RadioGroup>
      //         <FormControlLabel
      //           value={attendances}
      //           control={<Radio />}
      //           label={attendance.status}
      //           key={attendance.id}
      //           disabled
      //         />
      //       </RadioGroup>
      //     );
      //   } else {
      //     return (
      //       <RadioGroup>
      //         <FormControlLabel
      //           value="present"
      //           control={<Radio />}
      //           label="present"
      //           key={attendance.id}
      //         />
      //       </RadioGroup>
      //     );
      //   }
      // },
    },
  ];
  useEffect(() => {
    if (section_id) {
      getStudents(section_id);
      setAttendances({});
    }
  }, [section_id, selectedDate]);

  useEffect(() => {
    const getgrade = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/grade`);
        setgrade(res.data.message);
        console.log(res.data.message);
        setGrade_id(res.data.message[0].id);
        console.log(grade);
      } catch (err) {
        console.log(err);
      }
    };

    getgrade();
  }, []);

  useEffect(() => {
    if (Grade_id) {
      let sections = [];
      grade.map((c) => {
        if (c.id === Grade_id) {
          sections = c.section;
        }
      });
      setSections(sections);
      setAttendances({});
      setSection_id(sections[0].id);
    }
  }, [Grade_id]);

  const getStudents = async (section_id) => {
    try {
      const res2 = await axios.get(
        `http://localhost:8000/api/student_section/${section_id}`
      );
      console.log(res2.data.message);
      setStudents(res2.data.message);
      setStudent_id(res2.data.message[0].id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/attendance/student/${student_id}`)
      .then((res) => {
        if (res.status === 200) {
          setAttendances(res.data.message);
          console.log(attendances.attendance_date);
        }
      });
  }, [section_id]);
  // //get attendance
  // useEffect(() => {
  //   const getAttendance = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:8000/api/attendance`);
  //       setAttendances(res.data.message);
  //       console.log(res.data.message);
  //       console.log(attendances);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getAttendance();
  // }, []);

  // const handleSubmit = (e) => {
  //   console.log("hello1");

  //   e.preventDefault();
  //   if (Object.keys(attendances).length === 0) return;
  //   let Attendances = [];
  //   Object.keys(attendances).forEach((key) => {
  //     Attendances = [
  //       ...Attendances,
  //       {
  //         student_id: ~~key,
  //         attendance_date: selectedDate,
  //         status: Attendances,
  //       },
  //     ];
  //   });
  //   console.log(Attendances);
  //   Attendances.forEach(async (attendance) => {
  //     try {
  //       const res = await axios.post(`http://localhost:8000/api/attendance`);
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });

  //   setAttendances({});
  // };
  return (
    <>
      {
        <CoPresentIcon
          style={{
            fontSize: "50px",
            color: "#204B64",
            marginLeft: "300px",
          }}
        />
      }
      <AttendanceContainer>
        <HeadContainer>
          <DateText>Today's date : {selectedDate}</DateText>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              label="Helper text example"
              slotProps={{
                textField: {
                  helperText: "MM / DD / YYYY",
                },
              }}
            />
          </LocalizationProvider> */}
          <FilterContainer>
            <FormControl variant="standard" sx={{ width: "100px" }}>
              <InputLabel>Class</InputLabel>
              <Select
                label="Class"
                onChange={(e) => {
                  setGrade_id(e.target.value);
                }}
                value={Grade_id || ""}
                name="std__Grade_id"
                required
              >
                <ListSubheader>Choose a class</ListSubheader>
                <MenuItem value="none" hidden>
                  Choose a class
                </MenuItem>
                {grade.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ width: "100px" }}>
              <InputLabel>Section</InputLabel>
              <Select
                label="Section"
                onChange={(e) => setSection_id(e.target.value)}
                value={section_id || ""}
                name="section_id"
                required
              >
                <ListSubheader>Choose a section</ListSubheader>
                {sections.map((c) => (
                  <MenuItem
                    key={c.id}
                    value={c.id}
                    onClick={() => {
                      getStudents(c.id);
                    }}
                  >
                    {c.section_description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FilterContainer>
          <Button
            variant="contained"
            color="success"
            size="medium"
            style={{ marginRight: "8px" }}
            type="submit"
            endIcon={<SaveIcon />}
            students
            disabled={disable}
          >
            Save Students
          </Button>
          <Button
            variant="contained"
            size="medium"
            style={{ marginRight: "8px" }}
            type="button"
            endIcon={<VisibilityIcon />}
          >
            View Attendances
          </Button>
        </HeadContainer>

        <GridContainer style={{ marginLeft: "200px" }}>
          <DataGrid
            rowHeight={75}
            rows={students}
            disableSelectionOnClick
            columns={columns}
            autoHeight
            checkboxSelection
            sx={{
              "& .one": {
                bgcolor: "#7879F1 !important",
              },
              "& .MuiDataGrid-cell:hover": {
                color: "#000000",
                cursor: "pointer",
              },
              fontSize: 14,
            }}
          />
        </GridContainer>
      </AttendanceContainer>
    </>
  );
};

export default Attendance;
