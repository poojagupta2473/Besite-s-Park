import React, { useEffect, useState, useContext } from "react";
import { authContext } from "../Authentication/context/AuthenticationProvider";
import Address from "../Address/Address";
import axiosInstance from "../../Utils/axiosInstance";
import Footer from "../Footer/Footer";

const Billing = () => {
  const [user, setUser] = useState({});
  const [productDetails, setProductDetails] = useState([]);

  const authState = useContext(authContext);
  const userId = authState.id;
  const amount = productDetails.allProductCost;

  const getUserHandle = async () => {
    try {
      const response = await axiosInstance.get(`/profile/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartDetails = async () => {
    try {
      const response = await axiosInstance.get(`/getCardDetails/${userId}`);
      setProductDetails(response.data);
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };

  const checkoutHandler = async () => {
    try {
      const {
        data: { key },
      } = await axiosInstance.get("/getkey");
      const {
        data: { order },
      } = await axiosInstance.post("/checkout", {
        userId,
        amount,
        productDetails,
      });

      const options = {
        key: key,
        amount: order?.amount,
        currency: "INR",
        name: "Payment Gateway",
        description: "Test Transaction",
        image: "https://avatars.githubusercontent.com/u/119498695?v=4",
        order_id: order?.id,
        callback_url: "http://localhost:5000/paymentVarification",
        prefill: {
          name: `${user?.name}`,
          email: `${user?.email}`,
          contact: `${user?.mobile ?? 9999999999}`,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#e28743",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartDetails();
    getUserHandle();
  }, []);

  return (
    <>
      <div className="container p-2 rounded">
        <h3 className="mb-4 p-3 rounded">Order Summary</h3>
        <div className="row">
          <hr />
          <div className="d-flex">
            <Address />
            <div className="col-md-4">
              <div className="card">
                <h5 className="card-header">Price details</h5>
                <div className="card-body">
                  <p className="card-text">Delivery Charges ₹ 49</p>
                  <p className="card-text">Packaging Charge: ₹ 99</p>
                  <p className="card-text">
                    Discount:{" "}
                    <span className="text-decoration-line-through">148</span>{" "}
                    <span style={{ color: "#3b8f3f" }}>Free</span>
                  </p>
                  <h5 className="card-text">
                    <strong>Total ₹ {amount}/-</strong>
                  </h5>
                  <p style={{ color: "#3b8f3f" }}>
                    You will save ₹ 49 on this order
                  </p>
                  <button className="btn btn-success" onClick={checkoutHandler}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Billing;
