import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectButton(props) {
  const [section, setSection] = useState([]);
  const [data, setData] = useState([]);

  const handleClassesChange = (event) => {
    setData(event.target.value);
  };
  const handleSectionsChange = (event) => {
    setSection(event.target.value);
  };
  const handleClick = (id) => {
    props.getSections ? props.getSections(id) : props.getStudents(id);
  };

  console.log(data);
  console.log(section);
  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth sx={{ maxWidth: 300, marginTop: 5 }}>
        <InputLabel id="demo-simple-select-label">{props.labelName}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.labelName === "Class" ? data : section}
          label={props.labelName}
          onChange={
            props.labelName === "Class"
              ? handleClassesChange
              : handleSectionsChange
          }
        >
          {props.options.map((option, index) => {
            return (
              <MenuItem
                key={index}
                value={option.name || option.section_description}
                onClick={() => handleClick(option.id)}
              >
                {option.name || option.section_description}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectButton;
