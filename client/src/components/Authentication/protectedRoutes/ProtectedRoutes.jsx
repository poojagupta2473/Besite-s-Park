import { authContext } from "../context/AuthenticationProvider";
import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const authState = useContext(authContext);
  // console.log(authState.auth);

  return <>{authState.auth ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoutes;
