import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Layout/Navbar/Navbar";
import ChooseFromMap from "./Layout/Navbar/ChooseFromMap";
import Dashboard from "./Pages/PatientDashboard/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/map" element={<ChooseFromMap/>}></Route>
          <Route path="/patient" element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
