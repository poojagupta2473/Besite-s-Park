import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Authentication/context/AuthenticationProvider";
import EmptyCart from "../../assets/Images/EmptyCart.webp";
import { IoMdFlash } from "react-icons/io";
import axiosInstance from "../../Utils/axiosInstance";

const Cart = () => {
  const [userCart, setUserCart] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [allProductCost, setAllProductCost] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [change, setChange] = useState(false);

  const authState = useContext(authContext);
  const userId = authState.id;

  const navigate = useNavigate();

  const Billing = () => {
    navigate(`/billing/${userId}`);
  };

  const fetchCartDetails = async () => {
    try {
      const response = await axiosInstance.get(`/getCardDetails/${userId}`);
      setUserCart(response?.data?.cartProducts);
      setAllProductCost(response?.data?.allProductCost);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart details:", error);
      setError("Error fetching cart details");
      setLoading(false);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axiosInstance.get(`/product/${productId}`);

      // Check if product details are already present before adding
      if (
        !productDetails.find((product) => product._id === response.data._id)
      ) {
        setProductDetails((prevDetails) => [...prevDetails, response.data]);
      }
    } catch (error) {
      console.error(`Error fetching product details for ${productId}:`, error);
      setError("Error fetching product details");
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (
        newQuantity === 0 &&
        !window.confirm("Do you want to remove the item?")
      ) {
        return;
      }

      await axiosInstance.put(`/updateQuantity/${userId}/${productId}`, {
        quantity: newQuantity,
      });
      setUserCart((prevUserCart) =>
        prevUserCart.map((product) =>
          product.productId === productId
            ? { ...product, quantity: newQuantity }
            : product
        )
      );
      if (newQuantity === 0) {
        setChange(true);
      }
      fetchCartDetails();
    } catch (error) {
      console.error(`Error updating quantity for ${productId}:`, error);
      setError(`Error updating quantity for ${productId}`);
    }
  };

  useEffect(() => {
    setUserCart([]);
    setProductDetails([]);
    setLoading(true);
    setError(null);
    // fetchCartDetails();
    setChange(false);
  }, [change, userId]);

  useEffect(() => {
    userCart?.forEach((product) => {
      fetchProductDetails(product.productId);
    });
    fetchCartDetails();
  }, [userCart?.length]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  if (!loading && !error && allProductCost == null) {
    return (
      <>
        <div className="container my-5 text-center">
          <div className="card p-4 shadow-lg" style={{ borderRadius: "15px" }}>
            <img
              className="rounded mx-auto d-block img-fluid"
              style={{ maxWidth: "300px" }}
              src={EmptyCart}
              alt="Empty Cart"
            />
            <h2 className="mt-3 mb-3">Your Cart is Empty!</h2>
            <p className="text-muted">
              Explore our wide selection and find something you like
            </p>
            <NavLink to="/allproducts" className="btn btn-primary mt-3">
              Shop Now
            </NavLink>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h2>Shopping Cart</h2>
            {productDetails?.map((product, index) => {
              const cartProduct = userCart?.find(
                (pro) => pro.productId === product._id
              );
              return (
                <div key={index} className="card mb-4">
                  <div className="row g-0">
                    <div className="col-md-2">
                      <div className="container d-flex justify-content-center">
                        <img
                          src={`data:${
                            product?.image?.contentType
                          };base64,${product?.image?.data.toString("base64")}`}
                          alt={`Product: ${product?.title}`}
                          className="img rounded-start mt-5"
                          style={{ maxWidth: "90%" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-10">
                      <div className="card-body">
                        <h4 className="card-text">
                          <strong>{product?.model}</strong>
                        </h4>
                        <h5 className="card-title" style={{ color: "#3b8f3f" }}>
                          ₹ {product?.price}
                          /-
                        </h5>
                        <ul>
                          <li className="card-text">Ram {product?.ram}Gb</li>
                          <li className="card-text">
                            Screen {product?.screen} inch
                          </li>
                          <li className="card-text">
                            Storage {product?.storage}
                          </li>
                          <li className="card-text">Color {product?.color}</li>
                        </ul>
                        {cartProduct && (
                          <>
                            {" "}
                            <div className="d-flex align-items-center">
                              <button
                                className="btn btn-secondary me-2 p-2"
                                onClick={() =>
                                  handleQuantityChange(
                                    cartProduct.productId,
                                    cartProduct.quantity - 1
                                  )
                                }
                                disabled={cartProduct.quantity <= 1}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="form-control text-center quantity-input"
                                value={cartProduct.quantity}
                                readOnly
                              />
                              <button
                                className="btn btn-secondary ms-2 p-2"
                                onClick={() =>
                                  handleQuantityChange(
                                    cartProduct.productId,
                                    cartProduct.quantity + 1
                                  )
                                }
                                disabled={cartProduct.quantity >= 5}
                              >
                                +
                              </button>
                              <button
                                className="btn remove-btn ms-4 p-2"
                                onClick={() => {
                                  handleQuantityChange(
                                    cartProduct.productId,
                                    0
                                  );
                                }}
                              >
                                <strong>Remove</strong>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4 mt-5">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Price details</h2>
                <hr />
                <p className="card-text">Delivery Charges ₹ 49</p>
                <p className="card-text">
                  Discount{" "}
                  <span className="text-decoration-line-through">49</span>{" "}
                  <span style={{ color: "#3b8f3f" }}>Free</span>
                </p>
                <h5 className="card-text">
                  <strong>Total ₹ {allProductCost} /-</strong>
                </h5>
                <p style={{ color: "#3b8f3f" }}>
                  You will save ₹ 49 on this order
                </p>
                <button className="btn btn-primary" onClick={Billing}>
                  <IoMdFlash /> Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
