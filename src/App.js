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


function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route path="/classroom" element={<ClassRoom></ClassRoom>} />
        <Route path="/sections" element={<Sections></Sections>} />
        <Route path="/student" element={<Students></Students>} />
        <Route path="/attendance" element={<Attendance></Attendance>} />
        <Route path="/admin" element={<Admin></Admin>} />
        <Route path="/setting" element={<Settings></Settings>} />
      </Routes>
    </div>
  );
}

export default App;





