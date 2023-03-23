import classes from "./topbar.module.css";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { CgProfile } from "react-icons/cg";
function Topbar() {
  if (useLocation().pathname === "/") return null;

  const authCookie = Cookies.get("auth");
  let adminName = "";
  if (!authCookie) {
  } else {
    try {
      const dataUser = JSON.parse(authCookie);
      console.log(dataUser);
      const token = dataUser.access_token;
      adminName = dataUser.user.name;
    } catch (error) {
      console.error("Invalid auth cookie:", authCookie);
    }
  }
  return (
    <div className={classes.topbar}>
      <div className={classes.admin}>
        <div className={classes.end}>
          <CgProfile/>
          <h4>{adminName}</h4>
        </div>
      </div>
    </div>
  );
}

export default Topbar;