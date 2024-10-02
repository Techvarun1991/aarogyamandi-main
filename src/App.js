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
<<<<<<< HEAD
import Delivery from './Pages/DeliveryAddress/Delivery';
import Deliveryaddre from './Pages/DeliveryAddress/Deliveryaddre';
import Checkoutpage from './Pages/Checkout/Checkoutpage';
import Orders from './Pages/Orders/Orders';
import TrackOrder from './Pages/Orders/TrackOrder';
import Notyetshipped from './Pages/Orders/Notyetshipped';
import CancelledOrders from './Pages/Orders/CancelledOrders';
import Checkout from './Pages/Checkout';
import Payment from './Pages/Orders/Payment';



=======
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
<<<<<<< HEAD
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/deliveryadd" element={<Deliveryaddre />} />
      <Route path="/checkout" element={<Checkoutpage />} /> 
      <Route path="/orders" element={<Orders />} />
      <Route path="/trackorder" element={<TrackOrder />} />
      <Route path="/notyetshipped" element={<Notyetshipped />} />
      <Route path="/cancelledorders" element={<CancelledOrders />} />
      <Route path="/check" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
=======
      <Route path="/Patient/Dashboard" element={<Dashboard />} />

      <Route
            path="/doctor/searchdoctor"
            element={<FindDorctorBySpecialityLocationAndCity />}
          ></Route>
          <Route path="/doctor/bycity" element={<FindByCity />}></Route>
          <Route path="/doctors" element={<Doctors />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
>>>>>>> eaad40f46678596b785eaa70a80f05bbe2018ed2
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
