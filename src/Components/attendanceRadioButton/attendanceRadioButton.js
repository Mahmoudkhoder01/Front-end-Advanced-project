import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {toast} from "react-toastify" 
const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));
function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

export default function UseRadioGroup({
  studentId,
  attendances,
  handleAttendanceChange,
  records,
  editStudentAttendance,
  // setDisableBtns,
  // disableBtns,
}) {
  const [value, setValue] = useState("");
  const [disableBtns, setDisableBtns] = useState(false);
  const [editPressed, setEditPressed] = useState(false);
  const handleEditDisableBtns = async () => {
    console.log("hey");
    setDisableBtns(false);
    setEditPressed(true);
    console.log(disableBtns);
    // editStudentAttendance(studentId)
  };

  const handleEditAttendance = () => {
    editStudentAttendance(studentId);
    setEditPressed(false);
  };

  useEffect(() => {
    console.log("hey", attendances);
    console.log(disableBtns);
    setDisableBtns(attendances?.length !== 0);
    const attendance =
      attendances.length !== 0
        ? attendances.find((attend) => attend.student_id === studentId)
        : "";

    // const attendance = "";

    const record = records?.find(
      (attendRecord) => attendRecord.student_id === studentId
    );

    if (attendance) {
      setValue(attendance.status);
    } else if (record) {
      setValue(record.status);
    } else {
      setValue(null);
    }
  }, [attendances, studentId]);

  const handleChange = (event) => {
    const attendance_status = event.target.value;
    console.log(event.target.value);
    setValue(attendance_status);
    handleAttendanceChange(studentId, attendance_status);
  };

  return (
    <>
      <RadioGroup
        // defaultValue={attendanceByDate}
        name="attendance"
        value={value}
        onChange={handleChange}
        style={{ display: "flex", flexDirection: "row" }}
        disabled={disableBtns}
      >
        <MyFormControlLabel
          value="present"
          label="Present"
          control={<Radio />}
          disabled={disableBtns}
        />
        <MyFormControlLabel
          value="late"
          label="Late"
          control={<Radio />}
          disabled={disableBtns}
        />
        <MyFormControlLabel
          value="absent"
          label="Absent"
          control={<Radio />}
          disabled={disableBtns}
        />
        <IconButton
          onClick={handleEditAttendance}
          style={{ display: editPressed ? "block" :"none" }}
        >
          <SaveIcon />
        </IconButton>
        <IconButton onClick={handleEditDisableBtns}>
          <EditIcon />
        </IconButton>
      </RadioGroup>
    </>
  );
}
