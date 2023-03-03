import { Fragment } from "react";
import { NavLink } from "react-router-dom";

// Import Css Files
import classes from "./nav.module.css";
import "./active.css";

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
            <RxDashboard className={classes.icons} size={25} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to={"/classroom"}>
            <MdOutlineClass className={classes.icons} size={25} />
            <span>ClassRoom</span>
          </NavLink>
          <NavLink to={"/sections"}>
            <HiTableCells className={classes.icons} size={25} />
            <span>Sections</span>
          </NavLink>
          <NavLink to={"/student"}>
            <BiUser className={classes.icons} size={25} />
            <span>Students</span>
          </NavLink>
          <NavLink to={"/attendance"}>
            <FaUserCheck className={classes.icons} size={25} />
            <span>Attendance</span>
          </NavLink>
          <NavLink to={"/admin"}>
            <FaUserTie className={classes.icons} size={25} />
            <span>Admins</span>
          </NavLink>
        </div>

        <div className={classes.setting}>
          <NavLink to={"/settings"}>
            <FiSettings className={classes.icons} size={25} />
            <span>Settings</span>
          </NavLink>
        </div>
      </nav>
    </Fragment>
  );
}

export default Sidebar;
