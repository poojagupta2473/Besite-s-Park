import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import { fetchProducts } from "../Slices/productsSlice";
import { ImSearch } from "react-icons/im";

const AllProducts = () => {
  const [filter, setFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [priceSortFilter, setPriceSortFilter] = useState("");

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((store) => store.products);

  const handleFilterChange = (e) => setFilter(e.target.value);

  // Filter Methods
  let filteredProducts = data?.filter((product) => {
    const matchFilter =
      product?.brand.toLowerCase().includes(filter.toLowerCase()) ||
      product?.model.toLowerCase().includes(filter.toLowerCase());

    const [minPrice, maxPrice] = priceFilter.split("-").map(Number);

    if (priceFilter.startsWith("<")) {
      return matchFilter && product.price < 10000;
    } else if (priceFilter.startsWith(">")) {
      return matchFilter && product.price > 75000;
    } else if (minPrice && maxPrice) {
      return (
        matchFilter && product.price >= minPrice && product.price <= maxPrice
      );
    } else {
      return matchFilter;
    }
  });
  if (priceSortFilter === "ascending") {
    filteredProducts = filteredProducts?.sort((a, b) => a.price - b.price);
  } else if (priceSortFilter === "descending") {
    filteredProducts = filteredProducts?.sort((a, b) => b.price - a.price);
  }

  useEffect(() => {
    if (!data) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

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
      <div style={{ backgroundColor: "#ffe6ff" }}>
        <div className="container py-5">
          <div className="d-flex flex-column flex-md-row align-items-center mb-4">
            <div className="input-group">
              <span className="input-group-text">
                <ImSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by Brand name or Model..."
                value={filter}
                onChange={handleFilterChange}
              />
            </div>
            <div className="ms-md-3 mt-3 mt-md-0 d-flex">
              <label htmlFor="price" className="form-label m-2">
                <strong>Price:</strong>
              </label>
              <select
                name="price"
                id="price"
                className="form-select"
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="">All Prices</option>
                <option value="<10000">Under ₹10,000</option>
                <option value="10000-25000">₹10,000 - ₹25,000</option>
                <option value="25000-50000">₹25,000 - ₹50,000</option>
                <option value="50000-75000">₹50,000 - ₹75,000</option>
                <option value=">75000">Over ₹75,000</option>
              </select>
              <label htmlFor="sort" className="form-label m-2">
                <strong>Sort: </strong>
              </label>
              <select
                name="sort"
                id="sort"
                className="form-select"
                onChange={(e) => setPriceSortFilter(e.target.value)}
              >
                <option value="none">None</option>
                <option value="asscending">Low to High</option>
                <option value="descending">High to Low</option>
              </select>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
            {filteredProducts?.length > 0 ? (
              <ProductCard data={filteredProducts} />
            ) : (
              <div className="text-center">
                <p className="fs-4">
                  <strong>No product found 😥</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
