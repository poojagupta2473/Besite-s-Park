import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfileUpdate = ({ userData, onUpdate, onCancel }) => {
  const [updatedData, setUpdatedData] = useState({ ...userData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setUpdatedData((prevData) => ({ ...prevData, dob: date || Date.now() }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={updatedData?.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              name="age"
              required
              value={updatedData?.age}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              name="mobile"
              required
              value={updatedData?.mobile}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pincode" className="form-label">
              Pincode
            </label>
            <input
              type="number"
              className="form-control"
              id="pincode"
              name="pincode"
              value={updatedData?.pincode}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={updatedData?.email}
              disabled
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-select"
              id="gender"
              name="gender"
              required
              value={updatedData?.gender}
              onChange={handleInputChange}
            >
              <option value="" default></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <br />
            <DatePicker
              className="form-control"
              selected={new Date(updatedData?.dob || Date.now())}
              onChange={handleDateChange}
              dateFormat="dd MMM yyyy"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={updatedData?.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <button type="submit" className="btn btn-success me-2">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileUpdate;
