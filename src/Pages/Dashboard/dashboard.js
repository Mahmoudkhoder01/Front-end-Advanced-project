import { useEffect, useState } from "react";
import Card from "../../Components/Card/card";
import Chart from "../../Components/Chart/chart";
import classes from "./dashboard.module.css";
import axios from "axios";
import Loading from "../../Components/Loading/loading";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [allAdmins, setAllAdmins] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  const getAllAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user");
      setAllAdmins(response.data.message);
      setIsLoading(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const getAllClasses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/grade");
      setAllClasses(response.data.message);
      setIsLoading(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const getAllSections = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/section");
      setAllSections(response.data.message);
      setIsLoading(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const getAllStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/students");
      setAllStudents(response.data.message);
      setIsLoading(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  useEffect(() => {
    getAllClasses();
  }, []);

  useEffect(() => {
    getAllSections();
  }, []);

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={classes.dashboard}>
          <div className={classes.cards}>
            <Card name={"Admins"} number={allAdmins.length.toString()} />
            <Card name={"Classes"} number={allClasses.length.toString()} />
            <Card name={"Sections"} number={allSections.length.toString()} />
            <Card name={"Students"} number={allStudents.length.toString()} />
          </div>
          <Chart />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Dashboard;
