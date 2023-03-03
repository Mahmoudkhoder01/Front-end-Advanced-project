import { Fragment } from "react";
import { NavLink } from "react-router-dom";

// Import Css Files
import classes from "./nav.module.css";
import  "./active.css";

// Impport Icons
import { MdOutlineClass } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { HiTableCells } from "react-icons/hi2";
import { BiUser } from "react-icons/bi";
import { FaUserCheck, FaUserTie } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

function Sidebar() {
  return (
    <Fragment>
      <nav>
        <div>
          <img
            className={classes.logo}
            src={process.env.PUBLIC_URL + "/Assets/LMS.svg"}
            alt="SVG Logo"
          />
        </div>
        <div className={classes.bar}>
          <NavLink to={"/"}>
            <RxDashboard />
            Dashboard
          </NavLink>
          <NavLink to={"/classroom"}>
            <MdOutlineClass /> ClassRoom
          </NavLink>
          <NavLink to={"/sections"}>
            <HiTableCells />
            Sections
          </NavLink>
          <NavLink to={"/student"}>
            <BiUser />
            Students
          </NavLink>
          <NavLink to={"/attendance"}>
            <FaUserCheck />
            Attendance
          </NavLink>
          <NavLink to={"/admin"}>
            <FaUserTie />
            Admin
          </NavLink>
        </div>
        <div className={classes.setting}>
          <NavLink to={"/settings"}>
            <FiSettings />
            Settings
          </NavLink>
        </div>
      </nav>
    </Fragment>
  );
}

export default Sidebar;
