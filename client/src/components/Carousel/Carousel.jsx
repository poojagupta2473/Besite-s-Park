import React from "react";
import laptop from "../../assets/Images/manipulation-3851400_640.jpg";
import watch from "../../assets/Images/ski-4571972_640.jpg";
import bluetooth from "../../assets/Images/creative-reels-composition.jpg";
import smartphone from "../../assets/Images/social-3064515_640(1).jpg";

const carouselItems = [
  {
    image: smartphone,
    label: "Latest Smartphones at Your Fingertips",
    caption:
      "Stay connected with the latest smartphones offering advanced features.",
  },
  {
    image: laptop,
    label: "Powerful Laptops for Productivity",
    caption: "Boost your productivity with our powerful laptop collection.",
  },
  {
    image: bluetooth,
    label: "High-Quality Bluetooth Devices",
    caption:
      "Immerse yourself in high-quality audio with our Bluetooth devices.",
  },
  {
    image: watch,
    label: "Explore Stylish Watches",
    caption: "Discover a wide range of stylish watches for every occasion.",
  },
];

const Carousel = () => {
  return (
    <>
      <div
        id="carouselExampleCaptions"
        className="carousel slide "
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {carouselItems.map((item, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={item.image}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
                style={{ maxHeight: "30rem", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block text-dark">
                <h5>{item.label}</h5>
                <p>{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousel;
