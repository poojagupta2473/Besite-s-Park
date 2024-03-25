import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfileUpdate from "../profileUpdate/ProfileUpdate";
import { authContext } from "../context/AuthenticationProvider";
import axiosInstance from "../../../Utils/axiosInstance";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const authState = useContext(authContext);

  const getUserHandle = async () => {
    try {
      const response = await axiosInstance.get(`/profile/${authState.id}`);
      setUserData(response.data);
    } catch (error) {
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  // Callback function use to Upadate the data
  const handleUpdate = async (updatedData) => {
    try {
      const response = await axiosInstance.patch(
        `/profile/${authState.id}`,
        updatedData
      );
      if (response.status === 200) {
        setSuccess("Profile Updated successfully");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      }
      setUserData(updatedData);
      setIsEditing(false);
    } catch (error) {
      setError("Error updating user data");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    getUserHandle();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        {error}{" "}
        <button className="btn btn-danger" onClick={getUserHandle}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: "#ffe6f3" }}>
        <div className="container py-5">
          {success && (
            <div className="alert alert-success text-center" role="alert">
              {success}
            </div>
          )}

          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow">
                <div
                  className="card-body"
                  style={{ backgroundColor: "#ccddff" }}
                >
                  <h2 className="card-title text-center mb-4">
                    {isEditing ? "Edit Profile" : userData?.name}
                  </h2>
                  <div className="row">
                    <div className="col-md-6">
                      <p className="card-text fs-5">
                        <strong>Email:</strong> {userData?.email}
                      </p>
                      <p className="card-text fs-5">
                        <strong>Mobile:</strong> {userData?.mobile}
                      </p>
                      <p className="card-text fs-5">
                        <strong>Age:</strong> {userData?.age}
                      </p>
                      <p className="card-text fs-5">
                        <strong>Gender:</strong> {userData?.gender}
                      </p>
                      <p className="card-text fs-5">
                        <strong>Date of Birth:</strong>{" "}
                        {new Date(userData?.dob).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  {isEditing ? (
                    <ProfileUpdate
                      userData={userData}
                      onUpdate={handleUpdate}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                    <div className="d-flex justify-content-around">
                      <div className="text-center mt-3">
                        <button
                          className="btn btn-primary"
                          onClick={handleEdit}
                        >
                          Update Profile
                        </button>
                      </div>
                      <div className="text-center mt-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => navigate("/profile/UpdateAddress")}
                        >
                          Update Address
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
