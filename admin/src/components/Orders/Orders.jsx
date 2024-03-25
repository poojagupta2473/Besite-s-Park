import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => setFilter(e.target.value);

  const getUserInfo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/profile/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      setError("Failed to fetch user info");
      return null;
    }
  };

  const getCustomerOrders = async () => {
    setLoading(true);
    try {
      const ordersResponse = await axios.get(
        "http://localhost:5000/admin/getCustomerOrders"
      );
      const ordersWithUserInfo = await Promise.all(
        ordersResponse.data.map(async (order) => {
          const userInfo = await getUserInfo(order.userId);
          return { ...order, userInfo };
        })
      );
      setOrders(ordersWithUserInfo);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomerOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.userInfo?.name.toLowerCase().includes(filter.toLowerCase()) ||
      order.userInfo?.email.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return (
      <div className="justify-content-center m-auto">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="container py-5" style={{ backgroundColor: "#eeffee" }}>
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by customer name or email..."
            value={filter}
            onChange={handleFilterChange}
          />
          <button className="btn btn-primary p-0 m-0">
            <span className="input-group-text" id="basic-addon2">
              <i className="bi bi-search">
                <ImSearch />
              </i>
            </span>
          </button>
        </div>
        {filteredOrders?.length > 0 ? (
          filteredOrders?.map((order) => (
            <div
              className="card mb-4 shadow-sm  text-white"
              key={order?._id}
              style={{ backgroundColor: "#660033" }}
            >
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{order?.userInfo?.name}</h5>
                <h5 className="mb-0">
                  {new Date(order?.orders[0]?.createdAt).toLocaleDateString()}
                </h5>
                <button
                  className="btn btn-light btn-sm"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#orderDetails${order?._id}`}
                  aria-expanded="false"
                  aria-controls={`orderDetails${order?._id}`}
                >
                  View Details
                </button>
              </div>
              <div className="collapse" id={`orderDetails${order?._id}`}>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <p className="mb-2">
                        <strong>Email:</strong> {order?.userInfo?.email}
                      </p>
                      <p className="mb-2">
                        <strong>Mobile:</strong> {order?.userInfo?.mobile}
                      </p>
                      <p className="mb-2">
                        <strong>Address:</strong>{" "}
                        {` ${order?.userInfo?.address?.street} ${order?.userInfo?.address.city}, ${order?.userInfo?.address?.district}, ${order?.userInfo?.address?.state}`}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-2">
                        <strong>Order ID:</strong> {order?.orders[0]?.orderId}
                      </p>
                      <p className="mb-2">
                        <strong>Payment ID:</strong>{" "}
                        {order?.orders[0]?.paymentId}
                      </p>
                      <p className="mb-2">
                        <strong>Amount:</strong> ₹
                        {order?.orders[0]?.allProductCost}
                      </p>
                      <p className="mb-2">
                        <strong>Date:</strong>{" "}
                        {new Date(
                          order?.orders[0]?.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p className="fs-4">
              <strong>No orders found</strong>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
