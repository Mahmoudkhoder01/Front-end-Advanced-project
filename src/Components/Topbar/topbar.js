import classes from "./topbar.module.css";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUser } from "react-icons/fa";

function Topbar() {
  const style = {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/Assets/people.png"})`,
  };

  return (
    <div className={classes.topbar}>
      <div className={classes.admin}>
        {/* <div>
          <FaUser size={40} className={classes.userLogo} />
        </div> */}
        <div className={classes.end}>
          <h4>Mahmoud khodor</h4>
          {/* <HiOutlineLogout size={30} className={classes.logOut} /> */}
        </div>
      </div>
    </div>
  );
}

export default Topbar;