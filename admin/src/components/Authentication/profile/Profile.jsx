import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProfileUpdate from "../profileUpdate/ProfileUpdate";
import { authContext } from "../context/AuthenticationProvider";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const authState = useContext(authContext);

  const getUserHandle = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/profile/${authState.id}`
      );
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
      const response = await axios.patch(
        `http://localhost:5000/profile/${authState.id}`,
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

  return (
    <div className="container my-5">
      {success && (
        <div className="alert alert-success text-center" role="alert">
          {success}
        </div>
      )}
      {loading ? (
        <p className="text-center fs-5">Loading...</p>
      ) : error ? (
        <div className="alert alert-danger text-center">
          {error}{" "}
          <button className="btn btn-danger" onClick={getUserHandle}>
            Retry
          </button>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
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
                  </div>
                  <div className="col-md-6">
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
                  <div className="text-center mt-3">
                    <button className="btn btn-primary" onClick={handleEdit}>
                      Update Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
