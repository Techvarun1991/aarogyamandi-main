import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Layout/Navbar";
import FindDorctorBySpecialityLocationAndCity from "./Pages/Doctor/FindDorctorBySpecialityLocationAndCity";
import FindByCity from "./Pages/Doctor/FindDoctor";
import DoctorList from "./Pages/Doctor/DoctorList";
import Doctors from "./Pages/Doctor/Doctors";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/doctor/searchdoctor" element={<FindDorctorBySpecialityLocationAndCity/>}></Route>
          <Route path="/doctor/bycity" element={<FindByCity/>}></Route>
          <Route path="/doctors" element={<Doctors/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
