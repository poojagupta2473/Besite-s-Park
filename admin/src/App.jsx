import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Authentication/login/Login";
import AddProduct from "./components/AddProduct/AddProduct";
import AllUsers from "./components/AllUsers/AllUsers";
import AuthProvider from "./components/Authentication/context/AuthenticationProvider";
import ProtectedRoutes from "./components/Authentication/protectedRoutes/ProtectedRoutes";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import AllProducts from "./components/AllProducts/AllProducts";
import Sidebar from "./components/Sidebar/Sidebar";
import Orders from "./components/Orders/Orders";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div className="d-flex">
          <AuthProvider>
            <Sidebar />
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/admin/upload" element={<AddProduct />} />
                <Route path="/admin/allusers" element={<AllUsers />} />
                <Route path="/admin/UpdateUser/:id" element={<UpdateUser />} />
                <Route path="/admin/allproducts" element={<AllProducts />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route
                  path="/admin/updateProduct/:id"
                  element={<UpdateProduct />}
                />
              </Route>
              <Route path="/admin/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </AuthProvider>
        </div>
      </Router>
    </>
  );
};

export default App;
