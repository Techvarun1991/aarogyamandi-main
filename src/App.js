import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MedicineHomepage from './Pages/Medicine/MedicineHomepage';


import Productmainpage from './Pages/ProductDetails/Productmainpage';
import AllProducts from './Pages/Product/AllProduct';
import WishList from './Pages/WishList/WishList';
import Cart from './Pages/Cart/Cart';
import VerifyCode from './Pages/Doctor/VerifyCode';
import ForgotPassword from './Pages/Doctor/ForgotPassword';
import Navbar from './Layout/Navbar/Navbar';
import Dashboard from './Pages/PatientDashboard/Dashboard';
import FindDorctorBySpecialityLocationAndCity from "./Pages/Doctor/FindDorctorBySpecialityLocationAndCity";
import FindByCity from "./Pages/Doctor/FindDoctor";
import DoctorList from "./Pages/Doctor/DoctorList";
import Doctors from "./Pages/Doctor/Doctors";
import Login from "./Pages/Login";
import Signup from './Pages/Signup';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
      <Routes>
        
      {/* <Route path="/doctor" element={<Doctor />} /> */}
      <Route path='/verifycode' element={<VerifyCode />}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path="/Medicine" element={<MedicineHomepage />} />
      <Route path="/product-details" element={<Productmainpage />} />
      <Route path="/product" element={<AllProducts />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/Patient/Dashboard" element={<Dashboard />} />

      <Route
            path="/doctor/searchdoctor"
            element={<FindDorctorBySpecialityLocationAndCity />}
          ></Route>
          <Route path="/doctor/bycity" element={<FindByCity />}></Route>
          <Route path="/doctors" element={<Doctors />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
