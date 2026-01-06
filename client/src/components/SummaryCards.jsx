import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Users,
    FileText,
    MessageSquare,
    Tags,
    TrendingUp,
} from "lucide-react";

function SummaryCards() {
    const [totalPosts, setTotalPosts] = useState("0");

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/posts/count")
            .then((res) => {
                setTotalPosts(res.data.totalPosts);
            })
            .catch((err) => console.error(err));
    }, []);

    const cards = [
        {
            title: "Users",
            value: "128", // ✅ unchanged
            subtitle: "Registered this week",
            icon: Users,
            color: "bg-indigo-500",
        },
        {
            title: "Posts",
            value: totalPosts, // ✅ REAL DATA
            subtitle: "Total posts",
            icon: FileText,
            color: "bg-blue-500",
        },
        {
            title: "Comments",
            value: "1,284", // ✅ unchanged
            subtitle: "Added this week",
            icon: MessageSquare,
            color: "bg-green-500",
        },
        {
            title: "Categories",
            value: "12", // ✅ unchanged
            subtitle: "Added this week",
            icon: Tags,
            color: "bg-orange-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                    <div
                        key={index}
                        className="bg-white dark:bg-slate-800 rounded-xl shadow p-5 hover:shadow-lg transition"
                    >
                        {/* Top */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {card.title}
                                </p>
                                <h2 className="text-2xl font-bold dark:text-white">
                                    {card.value}
                                </h2>
                            </div>

                            <div
                                className={`p-3 rounded-lg text-white ${card.color}`}
                            >
                                <Icon size={22} />
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <TrendingUp size={16} className="mr-1" />
                            {card.subtitle}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default SummaryCards;


//This is the flow of fetching total number of posts in post summary card

/*
http://localhost:8080/api/posts/count   ← URL
    ↓
post.routes.js
    ↓
getTotalPosts controller
    ↓
Post model
    ↓
MongoDB collection: posts


*/
