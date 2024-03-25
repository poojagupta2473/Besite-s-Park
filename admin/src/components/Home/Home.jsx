import React from "react";
import img from "../../assets/Images/Bar-graph-business-analysis-finance.jpg";

const Home = () => {
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col d-flex justify-content-between align-items-center">
            <h3 className="text-primary">Dashboard</h3>
            <div>
              <button
                className="btn btn-primary me-2"
                style={{ backgroundColor: "#660033" }}
              >
                Share
              </button>
              <button className="btn btn-secondary">Export</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col ms-5">
            <img
              src={img}
              alt="image"
              className="img-fluid"
              style={{ maxHeight: "95vh" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
