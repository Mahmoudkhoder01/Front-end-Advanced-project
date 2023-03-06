import classes from "./card.module.css";
import { BiUserCircle } from "react-icons/bi";

function Card() {
  return (
    <div className={classes.card}>
      <h2>
        <BiUserCircle size={30} />
        Number of Admins
      </h2>
      <span>18</span>
    </div>
  );
}

export default Card;
