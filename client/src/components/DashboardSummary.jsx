import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboardSummary.css";

function DashboardSummary() {
    const [postsCount, setPostsCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5000/api/posts/count")
            .then(res => setPostsCount(res.data.count));

        axios.get("http://localhost:5000/api/user/count")
            .then(res => setUsersCount(res.data.count));
    }, []);

    useEffect(() => {
        const fetchCommentsCount = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/comments/count");
                setCommentsCount(res.data?.count ?? 0);
            } catch (err) {
                console.warn("Failed to fetch comments count");
                setCommentsCount(0);
            }
        };

        fetchCommentsCount();
    }, []);

    const summaryData = [
        {
            title: "Users",
            count: usersCount,
            info: "Registered this week",
            icon: "👤",
        },
        {
            title: "Posts",
            count: postsCount,
            info: "Total posts",
            icon: "📝",
        },
        {
            title: "Comments",
            count: commentsCount,
            info: "Added this week",
            icon: "💬",
        },
        {
            title: "Categories",
            count: 12,
            info: "Added this week",
            icon: "📂",
        },
    ];

    return (<>
        <div className="summary-container">
            {summaryData.map((item, index) => (
                <div className="summary-card" key={index}>
                    <div className="card-left">
                        <h4>{item.title}</h4>
                        <h2>{item.count}</h2>
                        <p>↑ {item.info}</p>
                    </div>
                    <div className="card-icon">{item.icon}</div>
                </div>
            ))}
        </div>
    </>);
}

export default DashboardSummary;
