import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./components/Authentication/context/AuthenticationProvider";
import ProtectedRoutes from "./components/Authentication/protectedRoutes/ProtectedRoutes";
import Profile from "./components/Authentication/profile/Profile";
import Login from "./components/Authentication/login/Login";
import Signup from "./components/Authentication/signup/Signup";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Product from "./components/Product/Product";
import ContactUs from "./components/ContactUs/ContactUs";
import Billing from "./components/Billing/Billing";
import PaymentSuccess from "./components/Billing/PaymentSuccess";
import Cart from "./components/Cart/Cart";
import AllProducts from "./components/AllProducts/AllProducts";
import Orders from "./components/Orders/Orders";
import CreateReview from "./components/CreateReview/CreateReview";
import UpdateAddress from "./components/Authentication/UpdateAddress/UpdateAddress";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/profile/UpdateAddress"
                element={<UpdateAddress />}
              />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/billing/:id" element={<Billing />} />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path="/addtocart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route
                path="/product/review/create-review/:id"
                element={<CreateReview />}
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reg" element={<Signup />} />
          <Route path="/allproducts" element={<AllProducts />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
