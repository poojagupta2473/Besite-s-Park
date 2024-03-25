import React, { useState, useContext, useEffect } from "react";
import { authContext } from "../Authentication/context/AuthenticationProvider";
import axiosInstance from "../../Utils/axiosInstance";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(0);
  const [text, setText] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const nameHandler = (e) => setName(e.target.value);
  const emailHandler = (e) => setEmail(e.target.value);
  const mobileHandler = (e) => setMobile(e.target.value);
  const textHandler = (e) => setText(e.target.value);

  const authState = useContext(authContext);
  const userId = authState.id;

  const getUserdata = async () => {
    try {
      const response = await axiosInstance.get(`/getcontactus/${userId}`);
      // console.log(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setMobile(response.data.mobile);
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(`/contactus`, {
        userId,
        name,
        email,
        mobile,
        text,
      });
      if (response.status === 200) {
        setSuccess(response.data.success);
      } else {
        setError(response.data.error || "An error occurred");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    }
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  };

  useEffect(() => {
    getUserdata();
  }, [userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#ffe6f3" }}>
      <div className="container py-2">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div
              className="card p-4 shadow rounded-3"
              style={{ backgroundColor: "#ccddff" }}
            >
              {success && (
                <div className="alert alert-success text-center" role="alert">
                  success
                </div>
              )}
              {error ? (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              ) : (
                <div>
                  <h2 className="text-center mb-3 text-success">Contact Us</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={name}
                        onChange={nameHandler}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        value={email}
                        onChange={emailHandler}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobile" className="form-label">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="number"
                        required
                        value={mobile}
                        onChange={mobileHandler}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="5"
                        required
                        value={text}
                        onChange={textHandler}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success fw-bold fs-5"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
