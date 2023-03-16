import classes from "./topbar.module.css";
import { useLocation } from "react-router-dom";

function Topbar() {
  if (useLocation().pathname === "/login") return null;
  return (
    <div className={classes.topbar}>
      <div className={classes.admin}>
        <div className={classes.end}>
          <h4>Mahmoud khodor</h4>
        </div>
      </div>
    </div>
  );
}

export default Topbar;