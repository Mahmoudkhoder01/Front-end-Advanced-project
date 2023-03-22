import { useState, useEffect } from "react";
import React, { PureComponent } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import classes from './chart.module.css'

const Chart = ()=>{

const [attendanceData, setAttendanceData] = useState([]);

  useEffect(()=>{
    axios
      .get("http://localhost:8000/api/attendance", {
      })
      .then((response) => {
        console.log(response.data.message); 
        setAttendanceData(response.data.message); // update state with the entire response data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  const year = 2023; 
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2023, i, 1);
    return date.toLocaleString('default', { month: 'long' });
  });
  
  const monthlyAttendance = [];

  months.forEach((month) => {
    // filter the attendance data based on the year and month
    const filteredAttendance = attendanceData.filter((record) => {
      const recordDate = new Date(record.attendance_date);
      return recordDate.getFullYear() === year && recordDate.toLocaleString('default', { month: 'long' }) === month;
    });

    // count the number of records
    const presentCount = filteredAttendance.filter((record) => record.status === 'present').length;
    const lateCount = filteredAttendance.filter((record) => record.status === 'late').length;
    const absentCount = filteredAttendance.filter((record) => record.status === 'absent').length;

    // add the attendance data to the monthlyAttendance array
    monthlyAttendance.push({
      name: month,
      Present: presentCount,
      Late: lateCount,
      Absent: absentCount,
    });
  });

  
  console.log(monthlyAttendance);

    return (
      <div className={classes.chart}>
      <ResponsiveContainer >
        <div>
          <LineChart
            width={1500}
            height={500}
            data={monthlyAttendance}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Present"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="Late" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Absent" stroke="#DF2E38" />
          </LineChart>
        </div>
      </ResponsiveContainer>
      </div>
    );
  }

export default Chart