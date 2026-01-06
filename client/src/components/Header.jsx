import React from "react";
import {
    Menu,
    Search,
    Filter,
    Plus,
    Sun,
    Bell,
    Settings,
    ChevronDown
} from "lucide-react";
import image1 from "../assets/image1.jpg";
import "../styles/header.css";


function Header({ sideBarCollapsed, onToggleSideBar }) {
    return (
        <div className="header">
            <div className="header-container">

                {/* LEFT SECTION */}
                <div className="header-left">
                    <button className="icon-btn" onClick={onToggleSideBar}>
                        <Menu size={20} />
                    </button>

                    <div className="header-title">
                        <h1>Dashboard</h1>
                        <p>Welcome back, John! here's what's happening today</p>
                    </div>
                </div>

                {/* CENTER SECTION */}
                <div className="header-center">
                    <div className="search-box">
                        <Search className="search-icon" size={16} />
                        <input
                            type="text"
                            placeholder="Search Anything"
                        />
                        <button className="filter-btn">
                            <Filter size={16} />
                        </button>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="header-right">

                    <button className="new-btn">
                        <Plus size={16} />
                        <span>New</span>
                    </button>

                    <button className="icon-btn">
                        <Sun size={20} />
                    </button>

                    <button className="icon-btn notification-btn">
                        <Bell size={20} />
                        <span className="notification-badge">3</span>
                    </button>

                    <button className="icon-btn">
                        <Settings size={20} />
                    </button>

                    <div className="profile">
                        <img src={image1} alt="User" />
                        <div className="profile-info">
                            <p className="name">Alex JohSon</p>
                            <p className="role">Administrator</p>
                        </div>
                        <ChevronDown size={16} />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Header;
