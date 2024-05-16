import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import MedicineCards from "./Pages/Medicine/MedicineCards";
import MedicineCart from "./Pages/Medicine/MedicineCart";
import MedicineOverview from "./Pages/Medicine/MedicineOverview"
import Home from "./Pages/Home";
import Navbar from "./Layout/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar>

      </Navbar>
        <Routes>
          <Route path="/Medicine/Cart" element={<MedicineCart/>}></Route>
          <Route path="/Medicine" element={<MedicineCards/>}></Route>
          <Route path="/Medicine/Overview" element={<MedicineOverview/>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
