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

export default function UseRadioGroup(props) {
  // const [attendance, setAttendance] = useState(null)
  // let studentAtten = null;

  // const matchStudentAttend = (id) => {
  //   studentAtten = props.attendanceByDate?.filter(
  //     (attendance) => attendance.student_id === id
  //   );
  //   console.log(studentAtten);
  //   // setAttendance(studentAtten)
  // };
  // useEffect(() => {
  //   matchStudentAttend(props.studentId);
  // }, []);

  return (
    <>
      <RadioGroup
        name="use-radio-group"
        defaultValue={
          props.attendanceByDate.filter(
            (attendance) => attendance.student_id === props.studentId
          )[0]
            ?  props.attendanceByDate?.filter(
                (attendance) => attendance.student_id === props.studentId
              )[0].status :"present"
        }
        style={{ display: "flex", flexDirection: "row" }}
      >
        <MyFormControlLabel
          value="present"
          label="Present"
          control={<Radio />}
        />
        <MyFormControlLabel value="late" label="Late" control={<Radio />} />
        <MyFormControlLabel value="absent" label="Absent" control={<Radio />} />
      </RadioGroup>
    </>
  );
}
