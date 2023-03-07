import classes from "./card.module.css";
import { BiUserCircle } from "react-icons/bi";

function Card(props) {
  return (
    <div className={classes.card}>
      <h2>
        <BiUserCircle size={30} />
        Number of {props.name}
      </h2>
      {props.number.length === 1 ? <p>{props.number}</p> : <span>{props.number}</span>}
        {/* <span>{props.number}</span> */} 
    </div>
  );
}

export default Card