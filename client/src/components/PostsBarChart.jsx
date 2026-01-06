import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const monthOrder = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function PostsBarChart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const now = new Date();

        // 1️⃣ Build rolling last 6 months (with year)
        const lastSixMonths = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            lastSixMonths.push({
                year: d.getFullYear(),
                monthIndex: d.getMonth(),
                month: monthOrder[d.getMonth()],
            });
        }

        // 2️⃣ Find required years (can be 1 or 2)
        const yearsNeeded = [...new Set(lastSixMonths.map(m => m.year))];

        // 3️⃣ Fetch stats for required years
        Promise.all(
            yearsNeeded.map(year =>
                axios.get("http://localhost:8080/api/posts/stats")
            )
        )
            .then((responses) => {
                // Merge all year data
                const mergedData = responses.flatMap((res, i) =>
                    res.data.map(item => ({
                        ...item,
                        year: yearsNeeded[i],
                        monthIndex: monthOrder.indexOf(item.month),
                    }))
                );

                // 4️⃣ Build final chart data (SUM posts per month)
                const finalData = lastSixMonths.map(({ year, month, monthIndex }) => {
                    const totalPosts = mergedData
                        .filter(d => d.year === year && d.monthIndex === monthIndex)
                        .reduce((sum, d) => sum + Number(d.posts), 0);

                    return {
                        month,
                        posts: totalPosts,
                    };
                });

                setChartData(finalData);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3">
                Posts (Last 6 Months)
            </h2>

            <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="posts" fill="#6366F1" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default PostsBarChart;
