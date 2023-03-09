import classes from "./card.module.css";
import { BiUserCircle } from "react-icons/bi";
import { VscSymbolClass } from "react-icons/vsc";
import { MdTableChart } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaUsersCog } from "react-icons/fa";

function Card(props) {
  return (
    <div className={classes.card}>
      <h2>
        {props.name === "Admins" ? (
          <FaUsersCog size={30} />
        ) : props.name === "Classes" ? (
          <VscSymbolClass size={30} />
        ) : props.name === "Sections" ? (
          <MdTableChart size={30} />
        ) : props.name === "Students" ? (
          <FiUsers size={30} />
        ) : null}
        Number of {props.name}
      </h2>
      {props.number.length === 1 ? (
        <p className={classes.pCard}>{props.number}</p>
      ) : (
        <span className={classes.cardSpan}>{props.number}</span>
      )}
    </div>
  );
}

export default Card;

// VscSymbolClass, MdTableChart, FiUsers, FaUsersCog
