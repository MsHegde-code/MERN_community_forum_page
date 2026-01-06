import Post from "../models/Post.js";

export const getPostsPerMonth = async (req, res) => {
    try {
        const data = await Post.aggregate([
            {
                // ✅ SAFELY CONVERT createdAt TO DATE
                $addFields: {
                    createdAtDate: { $toDate: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAtDate" },
                        month: { $month: "$createdAtDate" }
                    },
                    posts: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]);

        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const formattedData = data.map(item => ({
            year: item._id.year,
            month: monthNames[item._id.month - 1],
            posts: item.posts
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Post stats error:", error);
        res.status(500).json({ message: error.message });
    }
};


//get total posts
export const getTotalPosts = async (req, res) => {
    try {
        const totalPosts = await Post.countDocuments();
        res.status(200).json({ totalPosts });
    } catch (error) {
        res.status(500).json({ message: "Error fetching post count" });
    }
};
