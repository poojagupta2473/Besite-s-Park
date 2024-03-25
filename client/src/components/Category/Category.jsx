import React from "react";
import { NavLink } from "react-router-dom";

import camera from "../../assets/Images/smartphone-2493419_640.jpg";
import accessoriesung from "../../assets/Images/social-3064515_640(1).jpg";
import laptop from "../../assets/Images/mobile-phone-1875813_640.jpg";

const Category = () => {
  const data = [
    {
      id: 1,
      image: camera,
      title: "Camera",
    },
    {
      id: 2,
      image: accessoriesung,
      title: "Accessories",
    },
    {
      id: 3,
      image: laptop,
      title: "Laptop",
    },
  ];

  return (
    <>
      <div style={{ backgroundColor: "#eeffee" }}>
        <div className="container py-3">
          <div className="text-center">
            <h1 style={{ fontSize: "3rem", color: "#660035" }}>Categories</h1>
            <h6 className="text-muted">Top Product Categories</h6>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
            {data?.map((item) => (
              <div
                className="col mb-4"
                key={item?.id}
                style={{ cursor: "pointer" }}
              >
                <NavLink
                  to={`/category/${item?.id}`}
                  className="text-decoration-none"
                >
                  <div className="card bg-dark text-dark">
                    <img
                      src={item?.image}
                      className="card-img"
                      alt={item?.title}
                    />
                    <div className="card-img-overlay d-flex align-items-end">
                      <h5 className="card-title">{item?.title}</h5>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
