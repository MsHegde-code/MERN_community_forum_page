import "../styles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ALL_INTERESTS = ["Politics", "Sports", "Technology", "Science"];

function Signup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    interests: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterestChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value],
    }));
  };

  /* STEP 1 VALIDATION */
  const handleNext = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    setError("");
    setStep(2);
  };

  /* FINAL SUBMIT */
  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.interests.length === 0) {
      setError("Please select at least one interest");
      return;
    }

    setError("");

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful. Please login.");
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="login-page">
      <h1 className="auth-site-title">Community Forum</h1>
      <div className="login-box">
        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <p className="step-indicator">Step {step} / 2</p>

          {error && <p className="error-text">{error}</p>}

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="button" onClick={handleNext}>
                Next
              </button>
              <p className="register-text">
                Already registered ? <Link to="/login">Login now</Link>
              </p>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <label>Interests:</label>

              <div className="interest-chips-container">
                {ALL_INTERESTS.map((item) => (
                  <label
                    key={item}
                    className={`interest-chip ${formData.interests.includes(item) ? "selected" : ""
                      }`}
                  >
                    <input
                      type="checkbox"
                      value={item}
                      checked={formData.interests.includes(item)}
                      onChange={handleInterestChange}
                      hidden
                    />
                    {formData.interests.includes(item) && (
                      <svg
                        className="checkmark-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3333 4L6 11.3333L2.66667 8"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <div className="signup-actions">
                <button type="button" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="submit">Register</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;

// import "./login.css";
// import { useState } from "react";

// function Signup() {
//   const [formData, setformData] = useState({
//     name:"",
//     email:"",
//     gender:"",
//     interests:[],
//     password:"",
//   });

//   const handleChange = (e) => {
//     setformData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleInterestChange = (e) => {
//     const value = e.target.value;

//     setformData((prev) => ({
//       ...prev,
//       interests: prev.interests.includes(value)
//         ? prev.interests.filter((i) => i !== value)
//         : [...prev.interests, value],
//     }));
//   };

//     const handleSignup = async (e) => {
//     e.preventDefault();

//     console.log("Signup data:", formData);

//     const res = await fetch("http://localhost:5000/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert("Signup successful. Please login.");
//     } else {
//       alert(data.message || "Signup failed");
//     }
//   };

//   return (
//     <div>
//       <div className="login-page">
//         <div className="login-box">
//           <h2>Sign Up</h2>
//           <form onSubmit={handleSignup}>
//             <label>Name:</label>
//             <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
//             <br />
//             <label>Email:</label>
//             <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
//             <br />
//             <label>Gender:</label>
//             {/* <input type="text" placeholder="Male/Female" /> */}
//             <select name="gender" value={formData.gender}
//             onChange={handleChange}>
//               <option value="">Select Gender</option>
//               <option>Male</option>
//               <option>Female</option>
//             </select>
//             <br />
//             {/* <label>Interests:</label>

//             <div className="interest-group">
//               <div className="interest-row">
//                 <span>Politics</span>
//                 <input type="checkbox" value="Politics" />
//               </div>

//               <div className="interest-row">
//                 <span>Sports</span>
//                 <input type="checkbox" value="Sports" />
//               </div>

//               <div className="interest-row">
//                 <span>Technology</span>
//                 <input type="checkbox" value="Technology" />
//               </div>
//             </div> */}
//             {/* 2 column interest*/}
//             <label>Interests:</label>

//             <div className="interest-group two-column">
//               <div className="interest-item">
//                 <span>Politics</span>
//                 <input type="checkbox" value="Politics" checked={formData.interests.includes("Politics")} onChange={handleInterestChange} />
//               </div>

//               <div className="interest-item">
//                 <span>Sports</span>
//                 <input type="checkbox" value="Sports" checked={formData.interests.includes("Sports")} onChange={handleInterestChange}/>
//               </div>

//               <div className="interest-item">
//                 <span>Technology</span>
//                 <input type="checkbox" value="Technology" checked={formData.interests.includes("Technology")} onChange={handleInterestChange} />
//               </div>

//               <div className="interest-item">
//                 <span>Science</span>
//                 <input type="checkbox" value="Science" checked={formData.interests.includes("Science")} onChange={handleInterestChange} />
//               </div>
//             </div>

//             <label>Password:</label>
//             <input type="password" name="password" placeholder="Enter your password"  value={formData.password}
//             onChange={handleChange} />
//             <br />
//             <button type="submit">Register</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Signup;
