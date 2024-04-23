import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Medicine/Home";
import Navbar from "./Layout/Navbar";
import MedicineCards from "./Pages/Medicine/MedicineCards";
import MedicineCart from "./Pages/Medicine/MedicineCart";
import MedicineOverview from "./Pages/Medicine/MedicineOverview"

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/Home" element={<Home></Home>}></Route>
          <Route path="/Medicine/Cart" element={<MedicineCart></MedicineCart>}></Route>
          <Route path="/Medicine" element={<MedicineCards></MedicineCards>}></Route>
          <Route path="/Medicine/Overview" element={<MedicineOverview></MedicineOverview>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
