import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Authentication/context/AuthenticationProvider";
import axiosInstance from "../../Utils/axiosInstance";
import DeliveryAddress from "./DeliveryAddress.jsx/DeliveryAddress";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id: userId } = useContext(authContext);

  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/orders/${userId}`);
      if (response.data === 0) {
        setOrders(0);
      } else {
        setOrders(response.data);
        const cartProducts = response?.data?.cartProducts;
        cartProducts.forEach((product) => {
          getProductDetails(product.productId);
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getProductDetails = async (productId) => {
    if (!productId) {
      return;
    }
    try {
      const response = await axiosInstance.get(`/product/${productId}`);
      setProducts((prevProducts) => {
        const productExists = prevProducts.some(
          (product) => product._id === response.data._id
        );
        return productExists ? prevProducts : [...prevProducts, response.data];
      });
    } catch (error) {
      console.error(error);
    }
  };

  const printDate = (date) => {
    const purchaseDate = new Date(date);
    const formattedDate = purchaseDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const formattedTime = purchaseDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedDate + "  " + formattedTime;
  };

  useEffect(() => {
    getOrders();
  }, [userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (orders === 0) {
    return (
      <>
        <div className="container">
          <div className="card m-5">
            <div className="jumbotron text-center py-5">
              <h1>No Orders Yet</h1>
              <h5>You haven't made any orders yet.</h5>
              <button
                className="btn btn-success"
                onClick={() => navigate("/allproducts")}
              >
                Shopp Now
              </button>
              <h2 className="mt-4">👉🏿👈🏿🥺</h2>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container py-5">
        <DeliveryAddress orders={orders} products={products} />
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <h5 className="fs-4 fw-bold lh-1 mb-3s card-header">Products</h5>
              {products.map((product, index) => (
                <div key={index} className="card mb-3">
                  <div className="card-body">
                    <img
                      src={`data:${
                        product?.image?.contentType
                      };base64,${product?.image?.data?.toString("base64")}`}
                      alt={`Product: ${product?.title}`}
                      className="img-thumbnail float-start me-3"
                      style={{ maxWidth: "200px", height: "auto" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title text-primary">
                        {product?.model}
                      </h3>
                      <p className="card-text">
                        <strong>Ram: </strong> {product?.ram}
                      </p>
                      <p className="card-text">
                        <strong>Storage: </strong> {product?.storage}
                      </p>
                      <p className="card-text">
                        <strong>Quantity: </strong>
                        {orders?.cartProducts[0]?.quantity}
                      </p>
                      <p className="card-text">
                        <strong>Price: </strong> ₹ {product?.price}
                      </p>
                      <NavLink
                        to={`/Product/${product?._id}`}
                        className="btn btn-primary mt-auto"
                      >
                        View Product
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow">
              <h5 className="fs-4 fw-bold lh-1 mb-3s card-header">
                Order Summary
              </h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Order ID:</strong>{" "}
                  <span className="text-primary">{orders?.orderId}</span>
                </li>
                <li className="list-group-item">
                  <strong>Payment ID:</strong>
                  <span className="text-primary">{orders?.paymentId}</span>
                </li>
                <li className="list-group-item">
                  <strong>Quantity:</strong>{" "}
                  <span className="text-primary">
                    {orders?.cartProducts[0]?.quantity}
                  </span>
                </li>
                <li className="list-group-item">
                  <strong>Purchase on:</strong>
                  <span className="text-primary">
                    {printDate(orders?.purchaseDate)}
                  </span>
                </li>
                <li className="list-group-item">
                  <strong>Total Pay Amount:</strong>{" "}
                  <span className="text-primary">
                    ₹ {orders?.allProductCost}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
