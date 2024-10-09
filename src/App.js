import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MedicineHomepage from './Pages/Medicine/MedicineHomepage';


import Productmainpage from './Pages/ProductDetails/Productmainpage';
import AllProducts from './Pages/Product/AllProduct';
import WishList from './Pages/WishList/WishList';
import Cart from './Pages/Cart/Cart';
import VerifyCode from './Pages/Doctor/VerifyCode';
import ForgotPassword from './Pages/Doctor/ForgotPassword';
import Navbar from './Layout/Navbar/Navbar';
import Delivery from './Pages/DeliveryAddress/Delivery';
import Deliveryaddre from './Pages/DeliveryAddress/Deliveryaddre';
import Checkoutpage from './Pages/Checkout/Checkoutpage';
import Orders from './Pages/Orders/Orders';
import TrackOrder from './Pages/Orders/TrackOrder';
import Notyetshipped from './Pages/Orders/Notyetshipped';
import CancelledOrders from './Pages/Orders/CancelledOrders';
import Checkout from './Pages/Checkout';
import Payment from './Pages/Orders/Payment';
import OrderTab from './Pages/Orders/OrderTab';



import Dashboard from './Pages/PatientDashboard/Dashboard';
import FindDorctorBySpecialityLocationAndCity from "./Pages/Doctor/FindDorctorBySpecialityLocationAndCity";
import FindByCity from "./Pages/Doctor/FindDoctor";
import DoctorList from "./Pages/Doctor/DoctorList";
import Doctors from "./Pages/Doctor/Doctors";
import Login from "./Pages/Login";
import Signup from './Pages/Signup';
import NavbarLine from './Layout/Navbar/NavabarLine';
import ProtectedRoute from './Pages/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Navbar />
        <Routes>

          {/* <Route path="/doctor" element={<Doctor />} /> */}
          <Route path="/" element={<Navigate to="/Medicine" replace />} />

          <Route path="/Medicine" element={<ProtectedRoute element={MedicineHomepage} />} />
          <Route path="/product-details" element={<ProtectedRoute element={Productmainpage} />} />
          <Route path="/product" element={<ProtectedRoute element={AllProducts} />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<ProtectedRoute element={Cart} />} />
          <Route path="/address" element={<ProtectedRoute element={Deliveryaddre} />} />
          <Route path="/checkout" element={<Checkoutpage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/trackOrder" element={<TrackOrder />} />
          {/* <Route path="/notyetshipped" element={<Notyetshipped />} />
          <Route path="/cancelledorders" element={<CancelledOrders />} /> */}
          {/* <Route path="/check" element={<Checkout />} /> */}
          <Route path="/payment" element={<Payment />} />

          <Route path="/Patient/Dashboard" element={<Dashboard />} />

          <Route
            path="/doctor/searchdoctor"
            element={<ProtectedRoute element={FindDorctorBySpecialityLocationAndCity} />} />
          <Route path="/doctor/bycity" element={<ProtectedRoute element={FindByCity} />} />
          <Route path="/doctors" element={<Doctors />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
