import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import MedicineCards from "./Pages/Medicine/MedicineCards";
import MedicineCart from "./Pages/Medicine/MedicineCart";
import MedicineOverview from "./Pages/Medicine/MedicineOverview"
import Home from "./Pages/Home";
import ChooseFromMap from "./Layout/Navbar/ChooseFromMap";
import Dashboard from "./Pages/PatientDashboard/Dashboard";
import Navbar from "./Layout/Navbar/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar>

      </Navbar>
        <Routes>
          <Route path="/Medicine/Cart" element={<MedicineCart></MedicineCart>}></Route>
          <Route path="/Medicine" element={<MedicineCards></MedicineCards>}></Route>
          <Route path="/Medicine/Overview" element={<MedicineOverview></MedicineOverview>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/map" element={<ChooseFromMap/>}></Route>
          <Route path="/patient" element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
