import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect } from "react";
import axios from "axios";
const StatusRadio = (props) => {
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    console.log("statuses");

    setStatus(props.attendance.status);
  }, [props.attendance.status]);

  // //get attendance
  useEffect(() => {
    const getAttendance = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/attendance/section/${props.selectedSectionId}`
        );
        setStatuses(res.data.message);
        console.log(res.data.message);
        console.log(statuses);
      } catch (err) {
        console.log(err);
      }
    };
    
    getAttendance();
  }, []);

  console.log(statuses)

  const handleChange = (e) => {
    setStatus(parseInt(e.target.value));
    props.attendance({
      ...props.attendance,
      status: parseInt(e.target.value),
    });
  };

  return (
    <FormControl>
      <RadioGroup
        row
        value={status}
        onChange={handleChange}
        name="controlled-radio-buttons-group"
        required
      >
        {statuses.map((item) => (
          <FormControlLabel
            value={item.id}
            control={<Radio />}
            label={item.status}
            key={item.id}
            name={props.id.toString()}
            disabled={props.disabled}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default StatusRadio;
