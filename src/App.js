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



function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
      <Route path="/doctor" element={<Doctor />} />
      <Route path='/verifycode' element={<VerifyCode />}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path="/" element={<MedicineHomepage />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/product-details" element={<Productmainpage />} />
      <Route path="/product" element={<AllProducts />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/cart" element={<Cart />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
