import Card from "../../Components/Card/card";
import Chart from "../../Components/Chart/chart";
import classes from "./dashboard.module.css";

function Dashboard() {
  return (
    <div className={classes.dashboard}>
      <div className={classes.cards}>
        <Card name={"Admins"} number={"18"} />
        <Card name={"Classes"} number={"7"} />
        <Card name={"Sections"} number={"12"} />
        <Card name={"Students"} number={"47"} />
        <Chart />
      </div>
    </div>
  );
}

export default Dashboard;
