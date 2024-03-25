import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../Utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { authContext } from "../Authentication/context/AuthenticationProvider";
import "./CreateReview.css";

const CreateReview = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [headline, setHeadline] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const p_id = id;
  const authState = useContext(authContext);
  const userName = authState.name;
  const userId = authState.id;

  const handleHeadlineChange = (e) => setHeadline(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleRatingChange = (e) => setRating(e.target.value);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/product/${p_id}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append("productId", p_id);
      formPayload.append("userId", userId);
      formPayload.append("userName", userName);
      formPayload.append("headline", headline);
      formPayload.append("comment", comment);
      formPayload.append("rating", rating);
      if (image) {
        formPayload.append("image", image);
      }

      const response = await axiosInstance.post(
        `product/review/${p_id}`,
        formPayload
      );
      setMessage(response?.data?.message);
      setTimeout(() => {
        setMessage("");
        navigate(`/Product/${id}`);
      }, 3000);
    } catch (error) {
      setError("Somthong went wrog");
      setTimeout(() => {
        setError("");
        navigate(`/Product/${id}`);
      }, 3000);
      setError("Internal Server Error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [p_id]);

  return (
    <>
      <div className="container mt-2">
        <div className="card p-2">
          <div className="card-body">
            <h2 className="card-title">Create Review</h2>
            <hr />
            <div className="d-flex align-items-start">
              <img
                src={`data:${
                  data?.image?.contentType
                };base64,${data?.image?.data?.toString("base64")}`}
                alt={`Product: ${data?.title}`}
                className="img-fluid rounded-start me-3 p-3"
                style={{ maxWidth: "100px" }}
              />
              <div className="ms-5">
                <h3 className="text-success">Model: {data?.model}</h3>
                <h4>Ram: {data?.ram} Gb</h4>
                <h4>Color: {data?.color}</h4>
              </div>
            </div>
            <hr />
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <h2>Rate the Product</h2>
                <div className="rate fs-1">
                  {[...Array(5)]
                    .map((_, index) => {
                      const ratingValue = index + 1;
                      return (
                        <React.Fragment key={ratingValue}>
                          <input
                            type="radio"
                            id={`star${ratingValue}`}
                            name="rate"
                            value={ratingValue}
                            checked={ratingValue == rating} // Ensure correct checking
                            onChange={handleRatingChange}
                          />
                          <label
                            htmlFor={`star${ratingValue}`}
                            title={`${ratingValue} stars`}
                          >
                            {ratingValue} stars
                          </label>
                        </React.Fragment>
                      );
                    })
                    .reverse()}
                </div>
                <br />
              </div>

              <div className="mb-3 mt-5">
                <label htmlFor="headline" className="form-label">
                  Add a headlines
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="headline"
                  name="headline"
                  placeholder="What's most important to know?"
                  value={headline}
                  onChange={handleHeadlineChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="review" className="form-label">
                  Add a written review
                </label>
                <textarea
                  className="form-control"
                  id="review"
                  name="review"
                  rows="5"
                  placeholder="What did you like or dislike? What did you use this product for?"
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="productImage" className="form-label">
                  Add a photo or video
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="form-control"
                  id="productImage"
                  name="productImage"
                  onChange={handleImageChange}
                />
              </div>

              <button type="submit" className="btn btn-success m-2 me-5">
                Submit Review
              </button>
              <button
                type="cancel"
                className="btn btn-danger m-2"
                onClick={() => navigate(`/Product/${p_id}`)}
              >
                Cancel
              </button>
              {message && (
                <div className="alert alert-success text-center" role="alert">
                  {message}
                </div>
              )}

              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReview;
