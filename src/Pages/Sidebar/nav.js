import { Fragment } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

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
import { HiOutlineLogout } from "react-icons/hi";

function Sidebar(props) {
  const [cookies] = useCookies(["name"]);
  const isSuper = !!cookies.isSuperadmin;
  console.log(cookies);
  if (useLocation().pathname === "/") return null;
  return (
    <Fragment>
      <nav className={classes.sidebar}>
        <div>
          <img
            className={classes.logo}
            src={process.env.PUBLIC_URL + "/Assets/LMS.svg"}
            alt="SVG Logo"
          />
        </div>

        <div className={classes.bar}>
          <NavLink to={"/dashboard"}>
            <RxDashboard className={classes.icons} size={25} />
            <b></b>
            <u></u>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to={"/classroom"}>
            <MdOutlineClass className={classes.icons} size={25} />
            <b></b>
            <u></u>
            <span>ClassRoom</span>
          </NavLink>
          <NavLink to={"/sections"}>
            <HiTableCells className={classes.icons} size={25} />
            <b></b>
            <u></u>
            <span>Sections</span>
          </NavLink>
          <NavLink to={"/student"}>
            <BiUser className={classes.icons} size={25} />
            <b></b>
            <u></u>
            <span>Students</span>
          </NavLink>
          <NavLink to={"/attendance"}>
            <FaUserCheck className={classes.icons} size={25} />
            <b></b>
            <u></u>
            <span>Attendance</span>
          </NavLink>
          {isSuper === "1" ? (
            <NavLink to={"/admin"}>
              <FaUserTie className={classes.icons} size={25} />
              <b></b>
              <u></u>
              <span>Admins</span>
            </NavLink>
          ) : <Outlet/>}

          <NavLink to={"/settings"}>
            <FiSettings className={classes.icons} size={25} />
            <b></b>
            <u></u>
            <span>Settings</span>
          </NavLink>
        </div>

        <div className={classes.setting}>
          {/* <HiOutlineLogout size={30} className={classes.logOut} />
          <a href="s">Log Out</a> */}
          <NavLink to={"7"}>
            <HiOutlineLogout size={30} className={classes.logOut} />
            <span>Logout</span>
          </NavLink>
        </div>
      </nav>
    </Fragment>
  );
}

export default Sidebar;
