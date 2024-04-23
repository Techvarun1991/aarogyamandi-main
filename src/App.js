import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Layout/Navbar";
import FindDorctorBySpecialityLocationAndCity from "./Pages/Doctor/FindDorctorBySpecialityLocationAndCity";
import FindByCity from "./Pages/Doctor/FindDoctor";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/searchdoctor" element={<FindDorctorBySpecialityLocationAndCity/>}></Route>
          <Route path="/bycity" element={<FindByCity/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
