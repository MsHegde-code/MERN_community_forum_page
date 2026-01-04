import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import "../styles/navBar.css";
import CreatePost from "../pages/CreatePost";
import Dashboard from "../pages/Dashboard";


function NavBar() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-logo">Community Forum</h1>

          <nav className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default NavBar;
