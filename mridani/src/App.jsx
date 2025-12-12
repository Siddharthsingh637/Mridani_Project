import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Login from "./Pages/Auth/Login/Login";
import Signup from "./Pages/Auth/Register/Signup";
import Wishlist from "./Pages/Wishlist/Wishlist";
import ProductList from "./Components/ProductList/ProductList";
import ProductPageWrap from "./Pages/ProductDescription/ProductPageWrap";
import ProfilePage from "./Pages/Profile/ProfilePage";
import OrderPage from "./Pages/Orders/OrderPage";
import CartPageWrap from "./Pages/Purchase/Cart/CartpageWrap"; // ✅ New import
import BuynowWrap from "./Pages/Purchase/Buynow/BuynowWrap";
import { NotificationProvider } from "./Components/NotificationBar";

import { useMediaQuery } from "react-responsive";
// import { ScrollTextIcon } from "lucide-react";
import ScrollToTop from "./Components/ScrollToTop";
import ViewStatus from "./Pages/ViewStatus/ViewStatus";
import Payment from "./Pages/Purchase/Payment/Payment";

const AppRoutes = () => {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 1023 }); // Tailwind's `md` breakpoint

  const hideNavOnSignup = pathname === "/signup" || pathname === "/payment"; // ✅ hide full nav on payment
  const hideLowerNavDesktop =
    pathname === "/profile" || pathname === "/orders" || pathname === "/buynow" || pathname === "/payment";

  let contentPadding = "";

  if (hideNavOnSignup) {
    contentPadding = ""; // No navs, no padding
  } else if (isMobile) {
    contentPadding = "pt-[90px]"; // MobileNavbar only
  } else if (hideLowerNavDesktop) {
    contentPadding = "pt-[120px]"; // UpperNav only
  } else {
    contentPadding = "pt-[170px]"; // Both UpperNav + LowerNav visible
  }

  return (
    <>
      <Navbar />
    
      <ScrollToTop />
      <div className={contentPadding}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductPageWrap />} />
          <Route path="/:categoryType/:categoryName" element={<ProductList />} />
          <Route path="/products/collection/:collectionName" element={<ProductList />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/cart" element={<CartPageWrap />} /> {/* ✅ Added Route */}
          <Route path="/buynow" element={<BuynowWrap />} />
          <Route path="/viewstatus/:orderId" element={<ViewStatus />} />
          <Route path="/payment" element={<Payment/>} />


        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <NotificationProvider>
    <Router>
      <AppRoutes />
    </Router>
  </NotificationProvider>
);

export default App;
