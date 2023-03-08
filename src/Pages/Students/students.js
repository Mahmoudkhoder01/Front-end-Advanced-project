import React from "react";
import { Fragment } from "react";
import StudentCard from "../../Components/StudentCard/StudentCard";
import { FiPlus } from "react-icons/fi";
import Grid from "@mui/material/Grid";
import classes from "./students.module.css";
import DropDown from "../../Components/DropDown/DropDown";
import AddStudentForm from "../../Components/AddStudent/AddStudentForm";

function Students() {

  return (
    <Fragment>
      <div className={classes.students}>
        <div className={classes.header}>
          <div className={classes.dropdowns}>
            <DropDown />
            <DropDown />
          </div>
          <div>
            <AddStudentForm />
            {/* <button className={classes.addStudentBtn}>
              <FiPlus />
              Add Student
            </button> */}
          </div>
        </div>
        <div className={classes.studentGrid}>
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
        </div>
      </div>
    </Fragment>
  );
}

export default Students;
