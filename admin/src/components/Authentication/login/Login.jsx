import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { authContext } from "../context/AuthenticationProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const authState = useContext(authContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email.toLowerCase(),
        password: password,
      });

      if (response.status === 200) {
        // Assuming authState has setAuth, setId, and setName methods to update the context
        authState.setAuth(true);
        authState.setId(response.data.id);
        authState.setName(response.data.name);

        setSuccess(`Welcome ${response.data.name}`);
        setTimeout(() => {
          navigate("/admin/home");
        }, 2000);
      } else {
        console.log("Failed to login");
        setError(response.data.error);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data.error || "An unexpected error occurred");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <>
      <div className="container py-5" style={{ backgroundColor: "#eeffee" }}>
        <div className="row justify-content-center pt-3">
          <div className="col-md-8">
            <div
              className="card p-4 shadow rounded-3"
              style={{ background: "#f8f9fa" }}
            >
              {success && (
                <div className="alert alert-success text-center" role="alert">
                  {success}
                </div>
              )}
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}

              <h2 className="text-primary">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-success fw-bold fs-5">
                  Login
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
