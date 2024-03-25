import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ImSearch } from "react-icons/im";
import { fetchProducts } from "../slices/productsSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance ";

const AllProducts = () => {
  const [filter, setFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [priceSortFilter, setPriceSortFilter] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFilterChange = (e) => setFilter(e.target.value);

  const { data, isLoading, error } = useSelector((store) => store.products);

  const updateProduct = (id) => {
    navigate(`/admin/updateProduct/${id}`);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Do you want to remove the user?")) {
      return;
    }
    try {
      const response = await axiosInstance.delete(`/deleteProduct/${id}`);
      if (response.status === 204) {
        // console.log("Product Delete Success");
        dispatch(fetchProducts());
      }
    } catch (error) {
      console.log(error);
    }
  };

  let filterdProduct = data?.filter((product) => {
    let matchFilter =
      product?.brand.toLowerCase().includes(filter.toLowerCase()) ||
      product?.model.toLowerCase().includes(filter.toLowerCase());

    if (!priceFilter || priceFilter === "") {
      return matchFilter;
    }

    const [minPrice, maxPrice] = priceFilter.split("-").map(Number);

    if (priceFilter.startsWith("<")) {
      return matchFilter && product.price < 10000;
    } else if (priceFilter.startsWith(">")) {
      return matchFilter && product.price > 50000;
    } else {
      return (
        matchFilter && product.price >= minPrice && product.price <= maxPrice
      );
    }
  });

  if (priceSortFilter === "ascending") {
    filterdProduct?.sort((a, b) => a.price - b.price);
  } else if (priceSortFilter === "descending") {
    filterdProduct?.sort((a, b) => b.price - a.price);
  }

  useEffect(() => {
    if (!data) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  if (isLoading) {
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
      <div style={{ backgroundColor: "#eeffee" }}>
        <div className="container my-4">
          <div className="text-center mb-4"></div>
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
            <div className="ms-md-3 mt-md-0 d-flex">
              <label htmlFor="price" className="form-label mt-2">
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
              <label htmlFor="sort" className="form-label mt-2">
                <strong>Sort: </strong>
              </label>
              <select
                name="sort"
                id="sort"
                className="form-select"
                onChange={(e) => setPriceSortFilter(e.target.value)}
              >
                <option value="asscending">Low to High</option>
                <option value="descending">High to Low</option>
              </select>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
            {filterdProduct?.length > 0 ? (
              filterdProduct?.map((item) => (
                <div className="col" key={item?._id}>
                  <div className="card h-100">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: "200px" }}
                    >
                      <img
                        src={`data:${
                          item?.img?.contentType
                        };base64,${item?.image?.data?.toString("base64")}`}
                        className="card-img-top img-fluid p-3"
                        alt="..."
                        onError={(e) => {
                          e.target.src = "your_placeholder_image_url";
                        }}
                        style={{ maxHeight: "200px", width: "auto" }}
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{item?.brand}</h3>
                      <h5 className="card-text">
                        <strong style={{ color: "#3b8f3f" }}>
                          ₹ {item?.price}
                        </strong>{" "}
                        /-
                      </h5>
                      <ul>
                        <li className="card-text">Model {item?.model}</li>
                        <li className="card-text">Ram {item?.ram} GB</li>
                        <li className="card-text">
                          Storage {item?.storage} GB
                        </li>
                        <li className="card-text">Screen {item?.screen}</li>
                      </ul>

                      <button
                        className="btn btn-success me-4"
                        onClick={() => updateProduct(item?._id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProduct(item?._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p className="fs-4">
                  <strong>No product found</strong>
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
