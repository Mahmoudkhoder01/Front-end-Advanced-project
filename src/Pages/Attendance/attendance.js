import React, { useState } from "react";
import classes from "./attendance.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
function Attendance() {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleRadioChange = (index, event) => {
    const newValues = [...value];
    newValues[index] = event.target.value;
    setValue(newValues);
  };

  const handleSave = () => {
    if (value.every((v) => v !== "")) {
      if (value.length < 5 && value.charAt()) {
        alert("you need to check everything");
        setSaved(false);
      } else {
        setClicked(true);
        setSaved(true);
      }
    } else {
      setClicked(false);
    }

    console.log(value);
  };

  const displayWord = (index) => {
    switch (value[index]) {
      case "present":
        return "Present";
      case "late":
        return "Late";
      case "online":
        return "Online";
      default:
        return "";
    }
  };

  const students = [
    { id: 1, first_name: "John", last_name: "Doe" },
    { id: 2, first_name: "Jane", last_name: "Doe" },
    { id: 3, first_name: "Bob", last_name: "Smith" },
    { id: 4, first_name: "Alice", last_name: "Johnson" },
    { id: 5, first_name: "Mike", last_name: "Williams" },
  ];

  return (
    <div className={classes.container}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.Tablecell}>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Attendance Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.first_name}</TableCell>
              <TableCell>{student.last_name}</TableCell>
              <TableCell>
                {saved && value[index] ? (
                  <div>{displayWord(index)}</div>
                ) : (
                  <RadioGroup
                    required
                    row
                    aria-label="attendance"
                    name={`attendance-${index}`}
                    value={value[index]}
                    onChange={(event) => handleRadioChange(index, event)}
                  >
                    <FormControlLabel
                      value="present"
                      control={<Radio />}
                      label="Present"
                    />
                    <FormControlLabel
                      value="late"
                      control={<Radio />}
                      label="Late"
                    />
                    <FormControlLabel
                      value="online"
                      control={<Radio />}
                      label="Online"
                    />
                  </RadioGroup>
                )}
              </TableCell>
              <TableCell>
                <IconButton aria-label="delete">
                  <DeleteIcon color="action" variant="outline" />
                </IconButton>
                <IconButton aria-label="update">
                  <EditIcon color="info" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {!clicked && (
        <Button
          className={classes.save}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      )}

      {/* to delete */}
    </div>
  );
}
export default Attendance;
