import classes from "./topbar.module.css";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";

function Topbar() {
  const style = {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/Assets/people.png"})`,
  };

  return (
    <div className={classes.topbar}>
      <div>
        <input
          className={classes.search}
          type="text"
          placeholder="Search"
          style={style}
        />
      </div>
      <div className={classes.admin}>
        <div>
          <BiUserCircle size={50} className={classes.userLogo} />
        </div>
        <div className={classes.end}>
          <h4>Mahmoud khodor</h4>
          <HiOutlineLogout size={25} className={classes.logOut} />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
