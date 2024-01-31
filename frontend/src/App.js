import './App.css';
import Header from "./component/header/Header.jsx"
import Home from "./component/home/Home.jsx"
import ProductDetails from "./component/product/ProductDetails.jsx"
import Footer from "./component/footer/Footer.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginSignup from './component/user/login/LoginSignup';
import Wishlist from './component/user/wishlist/Wishlist';
import Account from './component/user/account/Account';
import Orders from './component/user/orders/Orders.jsx';
import Cart from './component/user/cart/Cart.jsx';
import Checkout from './component/user/checkout/Checkout.jsx';
import Payment from './component/user/payment/Payment.jsx';
import Admin from './component/admin/Admin.jsx';
import PageNotFound from './component/Page-NotFound/PageNotFound.jsx';

function App() {


  return (<>
    <Router>
      <Header />

      <div className='container'>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/auth/google' element={<LoginSignup />} />
          <Route path='/account' element={<Account />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/myorders' element={<Orders />} />
          <Route path='/mycart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/admin/*' element={<Admin />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>

      </div>
      <Footer />
    </Router>
  </>
  );
}

export default App;
