import { useState } from "react";
import SelectButton from "../../Components/Select/select";
import classes from "./admin.module.css";

function Admin() {
  const [data, setData] = useState(["Class A", "Class B", "Class C"]);
  const [another, setAnother] = useState(["Section A", "Section B", "Section C"]);
  return (
    <div className={classes.adminPage}>
      <SelectButton labelName="Classe" options={data} />
      <SelectButton labelName="Section" options={another} />
    </div>
  );
}

export default Admin;
