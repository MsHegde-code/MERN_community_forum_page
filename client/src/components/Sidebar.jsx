import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import { useAuth } from "../context/authContext";

function Sidebar({ isOpen, onClose }) {
  const { isAdmin } = useAuth();

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Menu</h2>
          <button className="sidebar-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link" onClick={onClose}>
            <span className="sidebar-link-icon">🏠</span>
            <span>Home</span>
          </Link>
          <Link to="/profile" className="sidebar-link" onClick={onClose}>
            <span className="sidebar-link-icon">👤</span>
            <span>Profile</span>
          </Link>
          {isAdmin && (
            <li>
              <Link to="/dashboard" className="sidebar-link" onClick={onClose}>
                {" "}
                <span className="sidebar-link-icon">📊</span>
                <span>Dashboard</span>
              </Link>
            </li>
          )}

          {/* <Link to="/dashboard" className="sidebar-link" onClick={onClose}>
            <span className="sidebar-link-icon">📊</span>
            <span>Dashboard</span>
          </Link> */}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
