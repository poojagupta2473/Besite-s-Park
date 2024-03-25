import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { authContext } from "../Authentication/context/AuthenticationProvider";

const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const authState = useContext(authContext);
  const userId = authState.id;
  const productId = id;

  const loadProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/product/${id}`);
      setProductData(response.data);
    } catch (error) {
      setError("Error fetching product data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const editProductDetails = () => {};
  const deleteProduct = () => {};

  useEffect(() => {
    loadProductData();
  }, [productId]);

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

  return (
    <>
      <div className="container-fluid mt-3">
        {success && (
          <div className="alert alert-success text-center" role="alert">
            {success}
          </div>
        )}
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <div className="container d-flex justify-content-center">
                <img
                  src={`data:${
                    productData?.image?.contentType
                  };base64,${productData?.image?.data?.toString("base64")}`}
                  alt={`Product: ${productData?.title}`}
                  className="img-fluid rounded-start mt-5"
                  style={{
                    maxWidth: "55%",
                  }}
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">{productData?.model}</h3>
                <h5 className="card-title" style={{ color: "#3b8f3f" }}>
                  ₹ {productData?.price} /-
                </h5>
                <p className="card-text">
                  <small className="text-muted">Hot deal</small>
                </p>
                <ul>
                  <li className="card-text">Ram {productData?.ram} Gb</li>
                  <li className="card-text">
                    Processor {productData?.processor}
                  </li>
                  <li className="card-text">Screen {productData?.screen}</li>
                  <li className="card-text">Camera {productData?.camera}</li>
                  <li className="card-text">
                    Storage {productData?.storage}GB
                  </li>
                  <li>Color {productData?.color}</li>
                </ul>
                <p className="card-text">
                  Description <br />
                  {productData?.about}
                </p>

                <button
                  className="btn btn-success"
                  onClick={editProductDetails}
                >
                  Edit
                </button>

                <button className="btn btn-danger" onClick={deleteProduct}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
