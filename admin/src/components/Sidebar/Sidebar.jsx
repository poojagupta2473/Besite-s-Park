import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaUserCog } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

import { authContext } from "../Authentication/context/AuthenticationProvider";

const Sidebar = () => {
  const authState = useContext(authContext);
  const navigate = useNavigate();

  const handelLogout = () => {
    authState.setAuth(false);
    authState.setId("");
    authState.setName("");
    navigate("/login");
  };

  return (
    <>
      <div className="col-md-2 p-2 bg-light sidebar">
        <ul className="nav flex-column fs-5">
          <li className="nav-item mb-2">
            <NavLink
              to="/admin/home"
              className="nav-link"
              style={{ color: "#660033" }}
            >
              <IoHome className="mb-1" /> Home
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/admin/allproducts"
              className="nav-link"
              style={{ color: "#660033" }}
            >
              <FaProductHunt className="mb-1" /> Product
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/admin/upload"
              className="nav-link"
              style={{ color: "#660033" }}
            >
              <BsDatabaseFillAdd className="mb-1" /> Add Product
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/admin/allusers"
              className="nav-link"
              style={{ color: "#660033" }}
            >
              <FaUserCog className="mb-1" /> Customer
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/admin/orders"
              className="nav-link"
              style={{ color: "#660033" }}
            >
              <FaCartArrowDown className="mb-1" /> Orders
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/admin/price"
              className="nav-link"
              style={{ color: "#660033" }}
            >
              <FaIndianRupeeSign className="mb-1" /> Price
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/admin/report"
              className="nav-link"
              style={{ color: "#660033" }}
            >
              <TbReportSearch className="mb-1" /> Report
            </NavLink>
          </li>
        </ul>
        <hr />
        <ul className="nav flex-column">
          <button
            className="nav-item mb-2 btn btn-primary"
            style={{ backgroundColor: "#660033" }}
          >
            <IoMdSettings className="mb-1" /> Setting
          </button>
          <button
            className="nav-item mb-2 btn btn-primary"
            style={{ backgroundColor: "#660033" }}
            onClick={handelLogout}
          >
            <FiLogOut className="mb-1" /> Logout
          </button>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
