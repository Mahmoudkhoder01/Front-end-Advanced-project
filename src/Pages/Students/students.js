import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import axios from "axios";
import StudentCard from "../../Components/StudentCard/StudentCard";
import { FiPlus } from "react-icons/fi";
import Grid from "@mui/material/Grid";
import classes from "./students.module.css";
import DropDown from "../../Components/DropDown/DropDown";
import AddStudentForm from "../../Components/AddStudent/AddStudentForm";
import { useState } from "react";
import SelectButton from "../../Components/Select/select";
function Students() {
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState("");

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

  const getStudents = async (section_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/students/section/${section_id}`
      );
      setStudents(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGrades();
  }, []);

  return (
    <Fragment>
      <div className={classes.students}>
        <div className={classes.header}>
          <div className={classes.dropdowns}>
            <SelectButton
              labelName="Class"
              options={grades}
              getSections={getSections}
            />
            <SelectButton
              labelName="Section"
              options={sections}
              getStudents={getStudents}
            />
            {/* <DropDown />
            <DropDown /> */}
          </div>
          <div>
            <AddStudentForm selectedSectionId={selectedSectionId} />
            {/* <button className={classes.addStudentBtn}>
              <FiPlus />
              Add Student
            </button> */}
          </div>
        </div>
        <div className={classes.studentGrid}>
          {students
            ? students.map((student) => <StudentCard student={student} />)
            : ""}
        </div>
      </div>
    </Fragment>
  );
}

export default Students;
