import DashboardSummary from "../components/DashboardSummary";
import PostsBarChart from "../components/PostsBarChart";
import "../styles/dashboard.css";
import UsersTable from "../components/UsersTable";

function Dashboard() {
    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>

            {/* Charts Row with Summary Cards */}
            <div className="charts-row">
                {/* Left: Bar Chart */}
                <div className="chart-half">
                    <PostsBarChart />
                </div>

                {/* Right: Summary Cards */}
                <div className="summary-cards-column">
                    <DashboardSummary />
                </div>
            </div>

            <UsersTable />

        </div>
    );
}

export default Dashboard;
