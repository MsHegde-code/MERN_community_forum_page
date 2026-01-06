import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import "../styles/navBar.css";
import CreatePost from "../pages/CreatePost";
import Dashboard from "../pages/Dashboard";
import { useSearch } from "../context/SearchContext";
import Sidebar from "./Sidebar";
import PostDetails from "../pages/PostDetails";


function NavBarContent() {
  const { search, setSearch, category, setCategory } = useSearch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const closeFilter = () => setIsFilterOpen(false);
  const clearFilter = () => setCategory("");

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
          <button className="navbar-hamburger" onClick={toggleSidebar}>
            ☰
          </button>
          
          <h1 className="navbar-logo">Community Forum</h1>

          <div className="navbar-actions">
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

            <button
              className="navbar-create-btn"
              onClick={() => navigate("/create")}
            >
              ✍ Create
            </button>
          </div>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
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
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/posts/:postId" element={<PostDetails />} />
        </Routes>
      </>
  );
}

export default NavBar;

