import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MedicineHomepage from './Pages/Medicine/MedicineHomepage';
import Banner from './Pages/Medicine/Banner';

import Productmainpage from './Pages/ProductDetails/Productmainpage';
import AllProducts from './Pages/Product/AllProduct';
import WishList from './Pages/WishList/WishList';
import CartProducts from './Pages/Cart/CartProducts';
import Cart from './Pages/Cart/Cart';
import Doctor from './Pages/Doctor/Doctor';
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




function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
      <Routes>
        
      <Route path="/doctor" element={<Doctor />} />
      <Route path='/verifycode' element={<VerifyCode />}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path="/Medicine" element={<MedicineHomepage />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/product-details" element={<Productmainpage />} />
      <Route path="/product" element={<AllProducts />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/deliveryadd" element={<Deliveryaddre />} />
      <Route path="/checkout" element={<Checkoutpage />} /> 
      <Route path="/orders" element={<Orders />} />
      <Route path="/trackorder" element={<TrackOrder />} />
      <Route path="/notyetshipped" element={<Notyetshipped />} />
      <Route path="/cancelledorders" element={<CancelledOrders />} />
      <Route path="/check" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
