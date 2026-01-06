import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const data = [
    { name: "Java", value: 400 },
    { name: "React", value: 300 },
    { name: "Spring Boot", value: 250 },
    { name: "DevOps", value: 150 },
    { name: "AI / ML", value: 100 },
];

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#0EA5E9"];

function CategoryPieChart() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">
                Posts by Category
            </h2>

            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default CategoryPieChart;
