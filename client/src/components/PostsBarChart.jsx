import { useEffect, useState } from "react";
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
import "../styles/PostsBarChart.css"

const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function PostsBarChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("/api/posts/stats").then((res) => {
            const stats = Array.isArray(res.data) ? res.data : [];

            const now = new Date();
            const months = [];

            // build last 6 months skeleton
            for (let i = 5; i >= 0; i--) {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                months.push({
                    year: d.getFullYear(),
                    monthIndex: d.getMonth() + 1,
                    month: monthNames[d.getMonth()],
                    posts: 0,
                });
            }

            // merge backend stats
            stats.forEach(item => {
                const match = months.find(
                    m =>
                        m.monthIndex === item._id.month &&
                        m.year === item._id.year
                );
                if (match) {
                    match.posts = item.count;
                }
            });

            setData(months);
        });
    }, []);

    return (
        <div className="chart-card">
            <div className="chart-header">
                <h3>Posts (Last 6 Months)</h3>
            </div>

            <div className="chart-body">
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                        data={data}
                        barSize={30}
                        margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} domain={[0, "dataMax + 2"]} />
                        <Tooltip />
                        <Bar
                            dataKey="posts"
                            minPointSize={4}
                            fill="#4f46e5"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

    );
}

export default PostsBarChart;
