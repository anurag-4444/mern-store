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
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileDetails } from './store/slices/user.jsx';
import UnauthorizedAccess from './component/unauthorized/UnauthorizedAccess.jsx';
import { useEffect } from 'react';
import { addProductToCart } from './store/slices/userCart.jsx';
import { addProductToWishlist } from './store/slices/wishlistCart.jsx';

function App() {

  const dispatch = useDispatch()
  axios.defaults.withCredentials = true;
  const { isAuthenticated, user } = useSelector((state) => state.User)

  if (isAuthenticated) {
    const temporaryCart = JSON.parse(localStorage.getItem('temporaryCart')) || [];
    const temporaryWishlist = JSON.parse(localStorage.getItem('temporaryWishlist')) || [];

    for (const product of temporaryCart) {
      dispatch(addProductToCart({ productId: product.productId, quantity: product.quantity }));
    }
    for (const product of temporaryWishlist) {
      dispatch(addProductToWishlist({ productId: product.productId }));
    }

    localStorage.removeItem('temporaryCart');
    localStorage.removeItem('temporaryWishlist');
  }
  useEffect(() => {
    dispatch(fetchProfileDetails())    
  }, [dispatch])

  return (<>
    <Router>
      <Header isAuthenticated={isAuthenticated} user={user} />

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

          {isAuthenticated ? (
            user.role === "admin" ? (
              <Route path='/admin/*' element={<Admin />} />
            ) : (
              <Route path='/admin/*' element={<UnauthorizedAccess />} />
            )
          ) : (
            <Route path='/admin/*' element={<UnauthorizedAccess />} />
          )}

          <Route path='/*' element={<PageNotFound />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>

      </div>
      <Footer />
    </Router>
  </>
  );
}

export default App;
