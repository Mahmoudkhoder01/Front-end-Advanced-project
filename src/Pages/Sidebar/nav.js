import { Fragment  } from "react";
import { NavLink } from "react-router-dom";
import classes from "./nav.module.css";

function Sidebar () {
  return (
    <Fragment>
      <nav>
        <div>
          <NavLink to={"/"}>
            Dashboard
          </NavLink>
          <NavLink to={"/classroom"}>
            ClassRoom
          </NavLink>
          <NavLink to={"/sections"}>
            Sections
          </NavLink>
          <NavLink to={"/student"}>
            Students
          </NavLink>
          <NavLink to={"/attendance"}>
            Attendance
          </NavLink>
          <NavLink to={"/admin"}>
            Admin
          </NavLink>
          <NavLink to={"/settings"}>
            Settings
          </NavLink>
        </div>
      </nav>
    </Fragment>
  );
};

export default Sidebar;
