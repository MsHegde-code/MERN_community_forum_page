import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import "../styles/navBar.css";
import CreatePost from "../pages/CreatePost";
import Dashboard from "../pages/Dashboard";
import { useSearch } from "../context/SearchContext";
import PostDetails from "../pages/PostDetails";
import { useAuth } from "../context/authContext";

function NavBarContent() {
  const { search, setSearch, category, setCategory } = useSearch();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const closeFilter = () => setIsFilterOpen(false);
  const clearFilter = () => setCategory("");

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const closeProfile = () => setIsProfileOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setIsFilterOpen(false);
  };

  const categoryNames = {
    react: "React",
    backend: "Backend",
    mongodb: "MongoDB",
    general: "General"
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">Community Forum</Link>
          </div>

          <div className="navbar-actions">

            <div className="navbar-center-group">
              <div className="navbar-search">
                <input
                  className="navbar-search-input"
                  placeholder="Search community posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="navbar-filter-wrapper">
                <button
                  className={`navbar-filter-btn ${category ? "navbar-filter-btn-active" : ""}`}
                  onClick={toggleFilter}
                  title="Filter by category"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  {category && (
                    <>
                      <span className="navbar-filter-category-name">
                        {categoryNames[category] || category}
                      </span>
                      <button
                        className="navbar-filter-clear"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearFilter();
                        }}
                        title="Clear filter"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </button>

                {isFilterOpen && (
                  <>
                    <div className="navbar-filter-overlay" onClick={closeFilter} />
                    <div className="navbar-filter-dropdown">
                      <div className="navbar-filter-header">
                        <span>Filter by Category</span>
                        <button className="navbar-filter-close" onClick={closeFilter}>
                          ✕
                        </button>
                      </div>
                      <div className="navbar-filter-options">
                        <button
                          className={`navbar-filter-option ${category === "" ? "active" : ""}`}
                          onClick={() => handleCategorySelect("")}
                        >
                          All Categories
                        </button>
                        <button
                          className={`navbar-filter-option ${category === "react" ? "active" : ""}`}
                          onClick={() => handleCategorySelect("react")}
                        >
                          React
                        </button>
                        <button
                          className={`navbar-filter-option ${category === "backend" ? "active" : ""}`}
                          onClick={() => handleCategorySelect("backend")}
                        >
                          Backend
                        </button>
                        <button
                          className={`navbar-filter-option ${category === "mongodb" ? "active" : ""}`}
                          onClick={() => handleCategorySelect("mongodb")}
                        >
                          MongoDB
                        </button>
                        <button
                          className={`navbar-filter-option ${category === "general" ? "active" : ""}`}
                          onClick={() => handleCategorySelect("general")}
                        >
                          General
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="navbar-right-group">
              <button
                className="navbar-create-btn"
                onClick={() => navigate("/create")}
              >
                ✍ Create
              </button>

              {/* Profile Dropdown */}
              <div className="navbar-profile-wrapper">
                <button className="navbar-profile-btn" onClick={toggleProfile}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=38bdf8&color=fff`}
                    alt="Profile"
                    className="navbar-profile-img"
                  />
                  <span className="navbar-profile-name">Hi, {user?.name || "Member"}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {isProfileOpen && (
                  <>
                    <div
                      className="navbar-filter-overlay"
                      onClick={closeProfile}
                      style={{ background: 'transparent' }}
                    />
                    <div className="navbar-profile-dropdown">
                      <Link to="/profile" className="navbar-profile-item" onClick={closeProfile}>
                        <span>View Profile</span>
                      </Link>
                      {user?.isAdmin && (
                        <Link to="/dashboard" className="navbar-profile-item" onClick={closeProfile}>
                          <span>Dashboard</span>
                        </Link>
                      )}
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '4px 0' }}></div>
                      <button className="navbar-profile-item" onClick={handleLogout}>
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}

function NavBar() {
  return (
    <>
      <NavBarContent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
      </Routes>
    </>
  );
}

export default NavBar;
