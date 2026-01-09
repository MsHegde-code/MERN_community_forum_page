import { useState } from "react";
import DashboardSummary from "../components/DashboardSummary";
import PostsBarChart from "../components/PostsBarChart";
import "../styles/dashboard.css";
import UsersTable from "../components/UsersTable";

function Dashboard() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <button className="refresh-btn" onClick={handleRefresh}>
                    Live Refresh ↻
                </button>
            </div>

            <div className="dashboard-content">
                {/* Left Column: Summary Cards + Bar Chart */}
                <div className="dashboard-left">
                    <DashboardSummary key={`summary-${refreshKey}`} />
                    <PostsBarChart key={`chart-${refreshKey}`} />
                </div>

                {/* Right Column: Users Table */}
                <div className="dashboard-right">
                    <UsersTable key={`table-${refreshKey}`} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
