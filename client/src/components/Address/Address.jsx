import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../Authentication/context/AuthenticationProvider";
import axiosInstance from "../../Utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const [addressData, setAddressData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authState = useContext(authContext);

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/profile/${authState.id}`);
      setAddressData(response?.data?.address);
      console.log(response?.data?.address);
    } catch (error) {
      console.error("Failed to fetch address", error);
      setError("Failed to load address data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [authState.id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header">Address</div>
          <div className="card-body">
            <h5 className="card-title">
              <strong>Your Shipping Address:</strong>
            </h5>
            <ul className="list-unstyled">
              <li className="card-text">
                <strong className="me-5">{addressData?.name} </strong>
                <span className="text-muted me-5">{addressData?.type}</span>
                <strong>{addressData?.mobile}</strong>
              </li>
              <li className="card-text">
                <strong>Email: </strong>
                {addressData?.email}
              </li>
              <li className="card-text">
                {addressData?.street}, {addressData?.city}, {addressData?.state}
                , {addressData?.district}, {addressData?.pincode}
              </li>
            </ul>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/profile/UpdateAddress")}
            >
              Update Address
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
