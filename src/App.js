import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Medicine/Home";
import Navbar from "./Layout/Navbar";
import MedicineCards from "./Pages/Medicine/MedicineCards";
import Medicine from "./Pages/Medicine/Medicine";
import MedicineOverview from "./Pages/Medicine/MedicineOverview"

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/Home" element={<Home></Home>}></Route>
          <Route path="/Medicine" element={<Medicine></Medicine>}></Route>
          <Route path="/MedicineCards" element={<MedicineCards></MedicineCards>}></Route>
          <Route path="/MedicineOverview" element={<MedicineOverview></MedicineOverview>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
