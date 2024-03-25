import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Slices/productsSlice";
import ProductCard from "../ProductCard/ProductCard";

const Features = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((store) => store.products);

  useEffect(() => {
    if (!data) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="alert alert-danger text-center">{error} </div>;
  }

  return (
    <>
      <div style={{ backgroundColor: "#eeffee" }}>
        <div className="container py-3">
          <div className="text-center">
            <h6>Top sells on the week</h6>
            <h1 style={{ color: "#ff4971" }}>Features Products</h1>
            <p>
              Explore our handpicked selection of top-selling products for this
              week.
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center m-1">
            <ProductCard data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
