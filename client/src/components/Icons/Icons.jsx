import React from "react";
import truck from "../../assets/icons/fast-delivery.png";
import pay from "../../assets/icons/pay.png";
import support from "../../assets/icons/live-chat.png";

const Icons = () => {
  const cardData = [
    {
      id: 1,
      image: truck,
      title: "Free Shipping",
      text: "All over Rupees 500",
    },
    {
      id: 2,
      image: pay,
      title: "100% Money Back",
      text: "On Cancelation",
    },
    {
      id: 3,
      image: support,
      title: "24/7 Call Support",
      text: "All over 12 Languages",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="row justify-content-center m-3">
        {cardData.map((item) => (
          <div key={item.id} className="col-md-4 d-flex align-items-stretch">
            <div className="card mb-4" style={{ width: "100%" }}>
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid p-3"
                    style={{ maxHeight: "80px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h6 className="card-title">{item.title}</h6>
                    <p className="card-text">{item.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Icons;
