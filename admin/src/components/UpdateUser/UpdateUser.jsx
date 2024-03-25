import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const Navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/profile/${id}`);
      setUser(response.data);
      setUpdatedData(response.data); // Initialize form with the fetched user data
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setError("Failed to fetch user data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setUpdatedData((prevData) => ({ ...prevData, dob: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/profile/${id}`,
        updatedData
      );
      if (response.status === 200) {
        setSuccess("Profile Updated successfully");
        setTimeout(() => {
          setSuccess("");
          Navigate("/admin/allusers");
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating user data", error);
      setError("Error updating user data");
    }
  };

  const onCancel = () => {
    setUpdatedData(user);
    Navigate("/admin/allusers");
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <>
      <div className="container py-4" style={{ backgroundColor: "#eeffee" }}>
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Form fields for user data */}
          <div className="row">
            <div className="col-md-6">
              {/* Name Field */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={updatedData?.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              {/* Age Field */}
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={updatedData?.age || ""}
                  onChange={handleInputChange}
                />
              </div>
              {/* Mobile Field */}
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={updatedData?.mobile || ""}
                  onChange={handleInputChange}
                />
              </div>
              {/* Pincode Field */}
              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">
                  Pincode
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  value={updatedData?.address?.pincode || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={updatedData?.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  name="password"
                  value={updatedData?.password || ""}
                  onChange={handleInputChange}
                />
              </div>
              {/* Gender Field */}
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  value={updatedData?.gender || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {/* DOB Field */}
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <DatePicker
                  selected={
                    updatedData?.dob ? new Date(updatedData?.dob) : null
                  }
                  onChange={handleDateChange}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
