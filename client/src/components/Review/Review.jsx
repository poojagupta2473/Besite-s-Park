import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utils/axiosInstance";
import { NavLink } from "react-router-dom";

const Review = ({ data: productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/product/reviews/${productId}`);
      setReviews(response.data);
      const totalRating = response.data.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const avgRating = response.data.length
        ? (totalRating / response.data.length).toFixed(1)
        : 0;
      setAverageRating(avgRating);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  const displayStars = (rating) =>
    Array.from({ length: rating }, (_, i) => "⭐").join("");

  const bufferToBase64 = (buf) => {
    var binary = "";
    var bytes = new Uint8Array(buf);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  useEffect(() => {
    fetchReviews();
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

  const ratingPercentage = (averageRating / 5) * 100;

  return (
    <>
      <div className="d-flex p-1" style={{ backgroundColor: "#e6ffe6" }}>
        <div className="container">
          <div className="card">
            <h3 className="card-title p-2">Reviews with images</h3>
            <div className="d-flex">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review?._id} className="d-flex  m-2">
                    {review?.image && review?.image?.data && (
                      <img
                        src={`data:${
                          review?.image?.contentType
                        };base64,${bufferToBase64(review?.image?.data?.data)}`}
                        alt="Review"
                        style={{ maxWidth: "100px" }}
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="m-2">
                  <p className="fs-3 text-danger">No Images yet.</p>
                  <p className="fs-5">Please Rate 🥺</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between my-2">
                <h3>Ratings & Reviews</h3>
                <NavLink
                  to={`/product/review/create-review/${productId}`}
                  className="fs-3 text-style-none"
                >
                  🥺Rate Product
                </NavLink>
              </div>
              <h5 className="card-title text-success fs-2">
                {averageRating}⭐ out of 5 stars
              </h5>
              <div className="bg-dark p-1 rounded">
                <div
                  className="progress-bar rounded"
                  role="progressbar"
                  style={{ width: `${ratingPercentage}%` }}
                  aria-valuenow={ratingPercentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {averageRating} Stars
                </div>
              </div>
              <div className="card">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review?._id}>
                      <ul className="card-body list-unstyled">
                        <li className="card-text">
                          <strong>Name: </strong>
                          {review?.userName}
                        </li>
                        <li className="card-text">
                          <strong>Rating: </strong>
                          {displayStars(review?.rating)}
                        </li>
                        <li className="card-text">
                          <strong>Headline: </strong>
                          {review?.headline}
                        </li>
                        <li className="card-text">
                          <strong>Comment: </strong>
                          {review?.comment}
                        </li>
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="container">
                    <p className="fs-3 text-danger">No reviews yet.</p>
                    <p className="fs-5">Please Rate 🥺</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
