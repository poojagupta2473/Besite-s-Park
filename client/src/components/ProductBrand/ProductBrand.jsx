import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProductByBrand, fetchProducts } from "../Slices/productsSlice";
import ProductCard from "../ProductCard/ProductCard";

const ProductBrand = ({ data: brand }) => {
  const dispatch = useDispatch();

  const productsByBrand = useSelector((store) =>
    selectProductByBrand(store, brand)
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1 className="text-success">Similar Products</h1>

      <div className="row row-cols-1 row-cols-md-4 g-4  m-1">
        <ProductCard data={productsByBrand} />
      </div>
    </>
  );
};

export default ProductBrand;
