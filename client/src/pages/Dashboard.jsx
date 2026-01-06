import DashboardSummary from "../components/DashboardSummary";
import PostsBarChart from "../components/PostsBarChart";
import "../styles/dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>

            <DashboardSummary />

            {/* Charts Row */}
            <div className="charts-row">
                {/* Left: Bar Chart */}
                <div className="chart-half">
                    <PostsBarChart />
                </div>

                {/* Right: Empty placeholder for Pie Chart */}
                <div className="chart-half empty-card">
                    {/* Pie chart will be added here later */}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
