import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Authentication/context/AuthenticationProvider";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { MdLogin, MdCheckBox } from "react-icons/md";
import { PiPhoneCallDuotone } from "react-icons/pi";
import axiosInstance from "../../Utils/axiosInstance";

const Navbar = () => {
  const [cartItems, setCartItems] = useState(0);
  const navigate = useNavigate();
  const authState = useContext(authContext);
  const userId = authState.id;

  const fetchCartNumber = async () => {
    if (userId) {
      try {
        const response = await axiosInstance.get(`/getCartNumber/${userId}`);
        setCartItems(response.data.item);
      } catch (error) {
        console.error("Error fetching cart number:", error);
      }
    }
  };

  const handleLogout = () => {
    setTimeout(() => {
      authState.setAuth(false);
      authState.setId("");
      authState.setName("");
    }, 1000);
  };

  useEffect(() => {
    fetchCartNumber();
  }, [userId]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-info-subtles "
        style={{ backgroundColor: "#660033" }}
      >
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand fs-4 fw-bold">
            Besite's Park
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/allproducts" className="nav-link">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  <PiPhoneCallDuotone className="mb-1" /> Contact
                </NavLink>
              </li>
            </ul>
            {authState.auth ? (
              <ul className="navbar-nav ms-auto">
                <li
                  className="nav-link text-light me-3"
                  style={{ fontSize: "1rem" }}
                >
                  Welcome {authState.name} !!
                </li>
                <li className="nav-item dropdown me-3">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account & Lists
                  </a>
                  <ul
                    className="dropdown-menu "
                    aria-labelledby="navbarDropdown"
                  >
                    <>
                      <li>
                        <NavLink to="/profile" className="dropdown-item">
                          <FaUser className="me-1" /> Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/orders" className="dropdown-item">
                          <MdCheckBox /> Orders
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/addtocart" className="dropdown-item">
                          <FaShoppingCart className="me-1" />
                          Cart{" "}
                          {cartItems > 0 && (
                            <span className="badge rounded-pill bg-danger">
                              {cartItems}
                            </span>
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          <CgLogOut /> Logout
                        </button>
                      </li>
                    </>
                  </ul>
                </li>
              </ul>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                <MdLogin className="me-1" />
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
