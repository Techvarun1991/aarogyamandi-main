import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Pages/Doctor/Sidebar";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/sidebar" element={<Sidebar />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App; 
