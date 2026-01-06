import React from "react";
import CategoryPieChart from "../components/CategoryPieChart";
import PostsBarChart from "../components/PostsBarChart";
import SummaryCards from "../components/SummaryCards";
import { useNavigate } from "react-router-dom";

function Dashboard({ onPageChange }) {

    const navigate = useNavigate();

    return (

        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            {/* Summary Cards */}
            <SummaryCards />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CategoryPieChart />
                <PostsBarChart />
            </div>

            <div className="space-y-6">


                <h1 className="text-2xl font-bold">Dashboard</h1>

                <button
                    onClick={() => navigate(`/comments`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                >
                    Go to Comments
                </button>
            </div>
        </div >
    );
}

export default Dashboard;
