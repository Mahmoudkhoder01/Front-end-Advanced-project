import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// import components
import ClassRoom from "./Pages/ClassRoom/classroom";
import Dashboard from "./Pages/Dashboard/dashboard";
import Sections from "./Pages/Sections/sections";
import Sidebar from "./Pages/Sidebar/nav";
import Students from "./Pages/Students/students";
import Attendance from "./Pages/Attendance/attendance";
import Admin from "./Pages/Admins/admin";
import Settings from "./Pages/Settings/settings";
import Topbar from "./Components/Topbar/topbar";
import Login from "./Pages/Login/login";

function App() {


  return (
    <div className="App">
      <div className="App-sidebar">
        <Sidebar />
        <Topbar />
      </div>
      <div className="App-container">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/classroom" element={<ClassRoom />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/student" element={<Students />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/setting" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
