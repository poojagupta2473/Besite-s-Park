import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthenticationProvider";
import axiosInstance from "../../../Utils/axiosInstance";

const UpdateAddress = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState("");

  const authState = useContext(authContext);

  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMobileChange = (e) => setMobile(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleStreetChange = (e) => setStreet(e.target.value);
  const handlePincodeChange = (e) => setPincode(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);
  const handleDistrictChange = (e) => setDistrict(e.target.value);

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get(`/profile/${authState.id}`);
      setName(response?.data?.address?.name);
      setEmail(response?.data?.address?.email);
      setMobile(response?.data?.address?.mobile);
      setPincode(response?.data?.address?.pincode);
      setCity(response?.data?.address?.city);
      setDistrict(response?.data?.address?.district);
      setStreet(response?.data?.address?.street);
      setState(response?.data?.address?.state);
      setType(response?.data?.address?.type);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(
        `/profile/address/${authState.id}`,
        {
          name,
          email,
          pincode,
          street,
          mobile,
          city,
          district,
          state,
          type,
        }
      );
      if (response.status === 200) {
        setMessage(response?.data?.message);
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      }
    } catch (error) {
      setError(error?.message || "Internal Server Error");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [authState.id]);

  return (
    <>
      <div className="py-3" style={{ backgroundColor: "#ffe6f3" }}>
        <div className="container">
          <div className="card p-3" style={{ backgroundColor: "#ccddff" }}>
            {message && (
              <div className="alert alert-success text-center" role="alert">
                {message}
              </div>
            )}
            {error && (
              <div className="alert alert-dengar text-center" role="alert">
                {error}
              </div>
            )}
            <h2 className="text-primary pb-2">Address Book</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile">Mobile:</label>
                <input
                  type="text"
                  id="mobile"
                  className="form-control"
                  value={mobile}
                  onChange={handleMobileChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city">City: </label>
                <input
                  type="text"
                  id="city"
                  className="form-control"
                  value={city}
                  onChange={handleCityChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="district">District: </label>
                <input
                  type="text"
                  id="district"
                  className="form-control"
                  value={district}
                  onChange={handleDistrictChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="pincode">Pin Code: </label>
                <input
                  type="text"
                  id="pincode"
                  className="form-control"
                  value={pincode}
                  onChange={handlePincodeChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address">State :</label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  value={state}
                  onChange={handleStateChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="state">Area & Street: </label>
                <input
                  type="text"
                  id="state"
                  className="form-control"
                  value={street}
                  onChange={handleStreetChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="type">Address Type: </label>
                <br />
                <input
                  type="radio"
                  name="type"
                  className="ms-3"
                  value="home"
                  checked={type === "home"}
                  onChange={handleTypeChange}
                />{" "}
                Home
                <input
                  type="radio"
                  name="type"
                  className="ms-3"
                  value="office"
                  checked={type === "office"}
                  onChange={handleTypeChange}
                />{" "}
                Office
                <input
                  type="radio"
                  name="type"
                  className="ms-3"
                  value="other"
                  checked={type === "other"}
                  onChange={handleTypeChange}
                />{" "}
                Other
              </div>

              <button type="submit" className="btn btn-success me-4">
                Save
              </button>
              <button
                type="cancle"
                onClick={() => navigate("/profile")}
                className="btn btn-danger"
              >
                Cancle
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAddress;
