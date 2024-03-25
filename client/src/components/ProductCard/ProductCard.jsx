import React from "react";
import { useNavigate } from "react-router-dom";
import { CgDetailsMore } from "react-icons/cg";

const ProductCard = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  // console.log(data);

  const pageHandle = (id) => {
    navigate(`/Product/${id}`);
  };

  return (
    <>
      {data?.map((item) => (
        <div className="col" key={item?._id}>
          <div className="card h-100" style={{ backgroundColor: "#fff4f4" }}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <img
                src={`data:${
                  item?.img?.contentType
                };base64,${item?.image?.data?.toString("base64")}`}
                className="card-img-top img-fluid p-2"
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
                <strong style={{ color: "#3b8f3f" }}>₹ {item?.price}</strong> /-
              </h5>
              <ul>
                <li className="card-text">Model {item?.model}</li>
                <li className="card-text">Ram {item?.ram} GB</li>
                <li className="card-text">Storage {item?.storage} GB</li>
                <li className="card-text">Screen {item?.screen}</li>
              </ul>
              <button
                className="btn btn-success"
                onClick={() => pageHandle(item?._id)}
              >
                <CgDetailsMore /> Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
