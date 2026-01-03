import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import "../styles/navBar.css";
import CreatePost from "../pages/CreatePost";


function NavBar() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-logo">Community Forum</h1>

          <nav className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>

    </BrowserRouter>
  );
}

export default NavBar;
