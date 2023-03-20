import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useEffect, useState } from "react";

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

export default function UseRadioGroup({ studentId, attendanceByDate, handleAttendanceChange, records}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const attendance = attendanceByDate?.find(
      (status) => status.student_id === studentId
    );

    const record = records?.find(
      (attendRecord) => attendRecord.student_id === studentId
    ); 

    if (attendance) {
      setValue(attendance.status);
    }else if (record){
       setValue(record.status);
    } else {
      setValue(null);
    }
  }, [attendanceByDate, studentId]);

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
        disabled={attendanceByDate.length !== 0}
      >
        <MyFormControlLabel
          value="present"
          label="Present"
          control={<Radio />}
          disabled={attendanceByDate.length !== 0}
        />
        <MyFormControlLabel
          value="late"
          label="Late"
          control={<Radio />}
          disabled={attendanceByDate.length !== 0}
        />
        <MyFormControlLabel
          value="absent"
          label="Absent"
          control={<Radio />}
          disabled={attendanceByDate.length !== 0}
        />
      </RadioGroup>
    </>
  );
}
