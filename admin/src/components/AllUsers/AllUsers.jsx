import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import axiosInstance from "../../Utils/axiosInstance ";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  const Navigate = useNavigate();

  const handleFilterChange = (e) => setFilter(e.target.value);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("allusers");
      setUsers(response?.data || []);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (userId) => {
    Navigate(`/admin/UpdateUser/${userId}`);
  };

  const deleteUser = async (UserId) => {
    if (!window.confirm("Do you want to remove the user?")) {
      return;
    }
    try {
      const response = await axiosInstance.delete(`/deleteUser/${UserId}`);
      if (response.status === 200) {
        setMessage("User deleted successfully");
        setTimeout(() => {
          setMessage("");
          const updatedUsers = users.filter((user) => user._id !== UserId);
          setUsers(updatedUsers);
        }, 3000);
      } else {
        setError("Error while deleting the user");
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      console.log(error);
      setError("Internal server error");
      setTimeout(() => setError(""), 3000);
    }
  };

  const filteredUser = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return (
      <div className="justify-content-center m-auto">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: "#eeffee" }}>
        <div className="container mt-5">
          {message && (
            <div className="alert alert-warning text-center" role="alert">
              {message}
            </div>
          )}
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by customer name or email..."
              value={filter}
              onChange={handleFilterChange}
            />
            <span className="input-group-text">
              <ImSearch />
            </span>
          </div>
          <div className="container-fluid d-flex flex-wrap">
            {filteredUser.length > 0 ? (
              filteredUser.map((user, index) => (
                <div
                  className="card m-1"
                  style={{ minWidth: "18rem" }}
                  key={user._id || index}
                >
                  <div className="card-body">
                    <h5 className="card-title">{user?.name}</h5>
                    <p className="card-subtitle">{user?._id}</p>
                    <p className="card-subtitle mb-1">{user?.email}</p>
                    <p className="card-subtitle">{user?.mobile}</p>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => updateUser(user._id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p className="fs-4">
                  <strong>No user found</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
