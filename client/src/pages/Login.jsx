import "../styles/login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

function Login() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   const res = await fetch("http://localhost:5000/api/auth/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       email: loginData.email,
  //       password: loginData.password,
  //     }),
  //   });

  //   const data = await res.json();

  //   if (!res.ok) {
  //     alert(data.message || "Login failed");
  //     return;
  //   }

  //   login(data.token);   // store token + fetch profile
  //   navigate("/");       // redirect to Home
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(loginData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.token);
      navigate("/"); //should be / not anything else
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
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

          <p className="register-text">
            New user? <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

// import "../styles/login.css";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/authContext.jsx";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const { login } = useAuth();

//   const [loginData, setLoginData] = useState({ email: "", password: "" });

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//   e.preventDefault();

//   const res = await fetch("http://localhost:5000/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ loginData.email, loginData.password }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     alert(data.message || "Login failed");
//     return;
//   }

//   login(data.token);     // store token + fetch profile
//   navigate("/");         // ✅ redirect to Home
// };

//   const handleChange = (e) => {
//     setLoginData({
//       ...loginData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div>
//       <div className="login-page">
//         <div className="login-box">
//           <h2>Login</h2>
//           <form onSubmit={handleLogin}>
//             <input
//               type="text"
//               name="email"
//               placeholder="Enter your Email"
//               value={loginData.email}
//               onChange={handleChange}
//             />
//             <br />
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               value={loginData.password}
//               onChange={handleChange}
//             />
//             <br />
//             <button type="submit">Login</button>
//             <p className="register-text">
//               New user? <Link to="/signup">Register</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Login;
