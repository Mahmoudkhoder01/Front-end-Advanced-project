import React from "react";
import classes from "./DropDown.module.css";

export default function DropDown() {
  return (
    <div>
      <select name="title" className={classes.dropDown}>
        <option value="">class 1</option>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Ms">Ms</option>
      </select>
    </div>
  );
}
