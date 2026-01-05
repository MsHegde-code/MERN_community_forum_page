import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../context/authContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Pages where only logo should be shown
  const authPages = ["/login", "/signup"];
  const showOnlyLogo = authPages.includes(location.pathname);

  const handleLogout = () => {
    logout(); // clears token & user
    navigate("/login"); // redirect to login
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        Community Forum
      </Link>

      {/* Links only when authenticated and not on auth pages */}
      {!showOnlyLogo && isAuthenticated && (
        <ul className="navbar-links">
          <li>
            {/* Dashboard link (future-ready) */}
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;

// import { Link, useLocation } from "react-router-dom";
// import "../styles/navbar.css";
// import { useAuth } from "../context/authContext";

// function Navbar() {
//   const { isAuthenticated, logout } = useAuth();
//   const location = useLocation();
//   const authPages = ["/login", "/signup"];

//   const showOnlyLogo = authPages.includes(location.pathname);

//   return (
//     <nav className="navbar">
//       {/* Logo */}
//       <Link to="/" className="navbar-logo">
//         Community Forum
//       </Link>

//       {/* Links only on profile / authenticated pages */}
//       {!showOnlyLogo && isAuthenticated && (
//         <ul className="navbar-links">
//           <li>
//             <Link to="/" className="nav-link">
//               Home
//             </Link>
//           </li>
//           <li>
//             <button className="nav-link logout-btn" onClick={logout}>
//               Logout
//             </button>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

// function Navbar() {
//   const { isAuthenticated, logout } = useAuth();

//   return (
//     <nav className="navbar">
//       {/* Logo */}
//       <Link to="/" className="navbar-logo">
//         Community Forum
//       </Link>

//       <ul className="navbar-links">
//         {isAuthenticated ? (
//           <>
//             <li>
//               <Link to="/" className="nav-link">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <button className="nav-link logout-btn" onClick={logout}>
//                 Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link to="/login" className="nav-link">
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link to="/signup" className="nav-link">
//                 Signup
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

// import "./navbar.css";
// function Navbar() {
//   return (
//     <div>
//       <nav className="navbar">
//         <h2 className="navbar-logo">Community Forum</h2>
//         <ul className="navbar-links">
//           <li>
//             <a href="/">Home</a>
//           </li>
//           <li>
//             <a href="/">Login</a>
//           </li>
//           <li>
//             <a href="/">Signup</a>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }
// export default Navbar;
