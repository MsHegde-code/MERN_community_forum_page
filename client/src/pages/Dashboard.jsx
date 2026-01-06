import React from "react";
import CategoryPieChart from "../components/CategoryPieChart";
import PostsBarChart from "../components/PostsBarChart";
import SummaryCards from "../components/SummaryCards";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

// #region agent log
fetch('http://127.0.0.1:7242/ingest/e99fdd60-98d7-4dbf-9ffb-8cf0051c7546',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Dashboard.jsx:12',message:'Dashboard component rendering',data:{hasCssImport:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

function Dashboard({ onPageChange }) {

    const navigate = useNavigate();

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/e99fdd60-98d7-4dbf-9ffb-8cf0051c7546',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Dashboard.jsx:18',message:'Dashboard render start',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    return (
        <div className="dashboard-content">
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>

                {/* Summary Cards */}
                <SummaryCards />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CategoryPieChart />
                    <PostsBarChart />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
