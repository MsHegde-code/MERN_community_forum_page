import React from "react";
import {
    User,
    FileTextIcon,
    Tags,
    LayoutDashboard,
    Zap,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import "../styles/sidebar.css";
import image1 from "../assets/image1.jpg";

const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { id: "users", icon: User, label: "Users", path: "/users" },
    { id: "posts", icon: FileTextIcon, label: "Posts", path: "/posts" },
    { id: "categories", icon: Tags, label: "Categories", path: "/categories" },
];

function Sidebar({ collapsed }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

            {/* LOGO */}
            <div className="sidebar-logo">
                <div className="logo-wrapper">
                    <div className="logo-icon">
                        <Zap size={24} />
                    </div>
                    {!collapsed && (
                        <div>
                            <h1>Community_Form</h1>
                            <p>Admin Panel</p>
                        </div>
                    )}
                </div>
            </div>

            {/* NAVIGATION */}
            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className={`sidebar-item ${isActive ? "active" : ""}`}
                        >
                            <div className="sidebar-item-left">
                                <Icon size={20} />
                                {!collapsed && <span>{item.label}</span>}
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* USER PROFILE */}
            {!collapsed && (
                <div className="sidebar-profile">
                    <div className="profile-box">
                        <img src={image1} alt="User" />
                        <div className="profile-info">
                            <p className="name">Alex Johnson</p>
                            <p className="role">Administrator</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
