import DashboardSummary from "../components/DashboardSummary";
import PostsBarChart from "../components/PostsBarChart";
import "../styles/dashboard.css";
import UsersTable from "../components/UsersTable";

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

      <UsersTable />
    </div>
  );
}

export default Dashboard;
