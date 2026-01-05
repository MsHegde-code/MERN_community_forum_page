import "../styles/login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    const data = await res.json();
    if (res.ok) {
      login(data.token);
      navigate("/profile");
    } else {
      alert(data.message || "Login failed");
    }
  };
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="login-page">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              placeholder="Enter your Email"
              value={loginData.email}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={loginData.password}
              onChange={handleChange}
            />
            <br />
            <button type="submit">Login</button>
            <p className="register-text">
              New user? <Link to="/signup">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
