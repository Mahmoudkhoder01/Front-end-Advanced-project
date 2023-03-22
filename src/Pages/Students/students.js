import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import axios from "axios";
import StudentCard from "../../Components/StudentCard/StudentCard";
import classes from "./students.module.css";
import AddStudentForm from "../../Components/AddStudent/AddStudentForm";
import { useState } from "react";
import SelectButton from "../../Components/Select/select";
import Pagination from "../../Components/paginantion/pagination";

function Students() {
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedSection, setSelectedSection] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')

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
    setSelectedClassId(grade_id);
    const grade = grades.find(g => g.id === grade_id).name;
    setSelectedGrade(grade)
    console.log(selectedGrade)
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
    setSelectedSectionId(section_id);
    const section = sections.find(s => s.id === section_id).section_description;
    setSelectedSection(section)
    console.log(section)
    try {
      const response = await axios.get(
        `http://localhost:8000/api/students/section/${section_id}`
      );
      setStudents(response.data.message);
      setIsLoading(true);
      console.log(response.data);
      console.log(section_id);
    } catch (error) {
      console.error(error);
    }
  };
  const getStudentsByPagination = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/students/attendance/section/${selectedSectionId}/pagination?page=${page}`
      );
      setPagination(response.data.message.data);
      setCounter(response.data.message);
      console.log(response);
      console.log(selectedSectionId);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePageChange = (event) => {
    setPage(parseInt(event.target.textContent));
  };

  useEffect(() => {
    getGrades();
  }, []);

  useEffect(() => {
    getStudentsByPagination();
  }, [selectedSectionId, page]);

  // console.log(pagination);

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
          </div>
          <div>
            {isLoading ? (
              <AddStudentForm
                selectedSectionId={selectedSectionId}
                regetDataAgain={getStudentsByPagination}
              />
            ) : null}
          </div>
        </div>
        {isLoading ? (
          <>
            <div className={classes.studentGrid}>
              {pagination
                ? pagination.map((student) => (
                    <>

                      <StudentCard
                        student={student}
                        regetDataAgain={getStudentsByPagination}
                      />
                    </>
                  ))
                : ""}
            </div>
            <Pagination
              onChange={handlePageChange}
              changepage={page}
              pagesCounter={counter.last_page}
            />
          </>
        ) : (
          <p className={classes.beforeChoose}>
            Choose a Class and a Section to see the Students
          </p>
        )}
      </div>
    </Fragment>
  );
}

export default Students;
