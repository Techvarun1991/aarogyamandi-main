import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import MedicineCards from "./Pages/Medicine/MedicineCards";
import MedicineCart from "./Pages/Medicine/MedicineCart";
import MedicineOverview from "./Pages/Medicine/MedicineOverview";
import Home from "./Pages/Home";
// import Navbar from "./Layout/Navbar";
import FindDorctorBySpecialityLocationAndCity from "./Pages/Doctor/FindDorctorBySpecialityLocationAndCity";
import FindByCity from "./Pages/Doctor/FindDoctor";
import DoctorList from "./Pages/Doctor/DoctorList";
import Doctors from "./Pages/Doctor/Doctors";

import ChooseFromMap from "./Layout/Navbar/ChooseFromMap";
import Dashboard from "./Pages/PatientDashboard/Dashboard";
import Navbar from "./Layout/Navbar/Navbar";
import ViewAllSeller from "./Pages/Medicine/ViewAllSeller";
import Login from "./Pages/Login";
import Main from "./Pages/Medicine new/Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        {/* <Carosole /> */}
        <Routes>
          <Route path="/Medicine/Cart" element={<MedicineCart />}></Route>
          <Route path="/Medicine" element={<Main />}></Route>
          <Route
            path="/Medicine/Overview"
            element={<MedicineOverview />}
          ></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/doctor/searchdoctor"
            element={<FindDorctorBySpecialityLocationAndCity />}
          ></Route>
          <Route path="/doctor/bycity" element={<FindByCity />}></Route>
          <Route path="/doctors" element={<Doctors />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
