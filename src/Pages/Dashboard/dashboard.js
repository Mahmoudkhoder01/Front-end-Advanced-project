import Card from "../../Components/Card/card";
import classes from "./dashboard.module.css";

function Dashboard() {
  return (
    <div className={classes.dashboard}>
      <div className={classes.cards}>
      <Card />
      <Card />
      <Card />
      <Card />
      </div>
    </div>
  );
}

export default Dashboard;
